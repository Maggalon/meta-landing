import assert from 'node:assert/strict';
import test from 'node:test';
import { deliverContact } from '../lib/contact-delivery.ts';

const payload = {
  name: 'Тестовая заявка', role: 'student', contact: 'test@example.invalid',
  task: 'direction', grade: '10', comment: 'Проверка интеграции', source: {},
  requestId: '12345678-1234-4234-8234-123456789abc',
  consent: { accepted: true, text: 'Тестовое согласие', url: '/consent', privacyUrl: '/privacy', at: '2026-09-18T00:00:00.000Z' },
};
const config = { provider: 'google-sheets', url: 'https://script.google.com/macros/s/test-deployment/exec', token: 'x'.repeat(64) };

test('Google redirect is followed with GET without forwarding personal data or the token', async () => {
  const calls = [];
  await deliverContact(payload, config, async (url, options) => {
    calls.push({ url: String(url), options });
    if (calls.length === 1) return new Response(null, { status: 302, headers: { location: 'https://script.googleusercontent.com/macros/echo?result=test' } });
    return Response.json({ ok: true, requestId: payload.requestId });
  });
  assert.equal(calls.length, 2);
  assert.equal(JSON.parse(calls[0].options.body).token, config.token);
  assert.equal(calls[0].options.redirect, 'manual');
  assert.equal(calls[1].options.body, undefined);
  assert.equal(calls[1].options.headers, undefined);
  assert.equal(calls[1].options.method, undefined);
  assert.equal(calls[1].options.redirect, 'error');
});

test('Google only succeeds with a matching persistent acknowledgement', async () => {
  await deliverContact(payload, config, async () => Response.json({ ok: true, requestId: payload.requestId, duplicate: true }));
  for (const result of [{ ok: false }, { ok: true }, { ok: true, requestId: 'wrong-id' }, null]) {
    await assert.rejects(deliverContact(payload, config, async () => Response.json(result)));
  }
  await assert.rejects(deliverContact(payload, config, async () => new Response('<html>Sign in</html>')));
  await assert.rejects(deliverContact(payload, config, async () => new Response('Unavailable', { status: 503 })));
});

test('unexpected redirects do not receive a follow-up request', async () => {
  for (const location of ['https://accounts.google.com/login', 'https://example.invalid', 'http://script.googleusercontent.com/result']) {
    let calls = 0;
    await assert.rejects(deliverContact(payload, config, async () => {
      calls++;
      return new Response(null, { status: 302, headers: { location } });
    }));
    assert.equal(calls, 1);
  }
});

test('incomplete or wrong Google configuration never sends an application', async () => {
  for (const invalid of [
    { ...config, token: '' },
    { ...config, url: 'https://script.google.com/macros/s/test/dev' },
    { ...config, url: 'https://example.invalid/exec' },
    { ...config, url: config.url + '?token=secret' },
    { ...config, provider: 'unknown' },
  ]) {
    let calls = 0;
    await assert.rejects(deliverContact(payload, invalid, async () => { calls++; return Response.json({ ok: true }); }));
    assert.equal(calls, 0);
  }
});

test('existing webhook delivery retains bearer authentication and idempotency key', async () => {
  await deliverContact(payload, { provider: 'webhook', url: 'https://example.invalid/contact', token: 'test-token' }, async (_url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    assert.equal(options.headers['Idempotency-Key'], payload.requestId);
    assert.equal(options.redirect, 'error');
    assert.deepEqual(JSON.parse(options.body), payload);
    return new Response(null, { status: 204 });
  });
});
