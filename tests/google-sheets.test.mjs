import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const code = readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url), 'utf8');
const token = 't'.repeat(64);
const payload = {
  token, name: '=1+1', role: 'parent', contact: '+70000000000', task: 'exams',
  grade: '10', comment: '=IMPORTXML("https://example.invalid", "//text()")',
  source: { utm_source: 'test' }, requestId: '12345678-1234-4234-8234-123456789abc',
  consent: { accepted: true, text: 'Тестовое согласие', url: '/consent', privacyUrl: '/privacy', at: '2026-09-18T00:00:00.000Z' },
};

function receiver({ busy = false, failWrite = false, headersWrong = false } = {}) {
  const rows = [];
  let releases = 0;
  let opens = 0;
  let context;
  const sheet = {
    getLastRow: () => rows.length + 1,
    getMaxRows: () => 1000,
    getRange: (row, column) => ({
      getValues: () => [headersWrong ? ['wrong header'] : vm.runInContext('HEADERS', context)],
      createTextFinder: (value) => {
        const finder = {
          matchEntireCell: () => finder, useRegularExpression: () => finder,
          findNext: () => rows.find((entry) => entry[0] === value) || null,
        };
        return finder;
      },
      setRichTextValues: (data) => {
        assert.equal(column, 1);
        assert.equal(row, rows.length + 2);
        if (failWrite) throw new Error('write failed');
        rows.push(Array.from(data[0], (cell) => cell.text));
        const range = { setVerticalAlignment: () => range, setWrap: () => range };
        return range;
      },
    }),
  };
  context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: (key) => ({ WEBHOOK_TOKEN: token, SPREADSHEET_ID: 'test-sheet', SHEET_NAME: 'Заявки' })[key] }) },
    LockService: { getScriptLock: () => ({ tryLock: () => !busy, releaseLock: () => releases++ }) },
    SpreadsheetApp: {
      openById: () => { opens++; return { getSheetByName: () => sheet }; },
      flush: () => {},
      newRichTextValue: () => {
        let text;
        const builder = { setText: (value) => { text = value; return builder; }, build: () => ({ text }) };
        return builder;
      },
    },
    ContentService: { MimeType: { JSON: 'application/json' }, createTextOutput: (value) => ({ setMimeType: () => value }) },
  });
  vm.runInContext(code, context);
  return {
    post: (body) => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(body) } })),
    get: () => JSON.parse(context.doGet()), rows,
    releases: () => releases, opens: () => opens,
  };
}

test('writes all columns as literal text, including formulas and phone numbers', () => {
  const app = receiver();
  assert.deepEqual(app.post(payload), { ok: true, requestId: payload.requestId });
  assert.equal(app.rows.length, 1);
  assert.equal(app.rows[0].length, 17);
  assert.equal(app.rows[0][2], '=1+1');
  assert.equal(app.rows[0][4], '+70000000000');
  assert.equal(app.rows[0][7], payload.comment);
  assert.equal(app.rows[0][8], 'Новая');
  assert.equal(app.rows[0][9], 'test');
  assert.equal(app.rows[0][13], payload.consent.at);
  assert.equal(app.releases(), 1);
});

test('retrying the same application acknowledges the existing row without duplicating it', () => {
  const app = receiver();
  app.post(payload);
  assert.deepEqual(app.post(payload), { ok: true, requestId: payload.requestId, duplicate: true });
  assert.equal(app.rows.length, 1);
  assert.equal(app.releases(), 2);
});

test('unauthenticated or invalid submissions never open the spreadsheet', () => {
  for (const body of [
    { ...payload, token: 'wrong' }, { ...payload, requestId: 'bad-id' },
    { ...payload, consent: { ...payload.consent, accepted: false } },
    { ...payload, name: '' }, { ...payload, comment: 'x'.repeat(2001) },
    { ...payload, task: 'toString' },
  ]) {
    const app = receiver();
    assert.equal(app.post(body).ok, false);
    assert.equal(app.rows.length, 0);
    assert.equal(app.opens(), 0);
  }
});

test('lock contention, changed headers and storage failures never report success', () => {
  for (const options of [{ busy: true }, { failWrite: true }, { headersWrong: true }]) {
    const app = receiver(options);
    assert.equal(app.post(payload).ok, false);
    assert.equal(app.rows.length, 0);
    assert.equal(app.releases(), options.busy ? 0 : 1);
  }
});

test('health endpoint does not disclose applicant data or secrets', () => {
  const app = receiver();
  app.post(payload);
  assert.deepEqual(app.get(), { ok: true, service: 'meta-applications', version: 1 });
});
