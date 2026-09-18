// Paste into a Google Apps Script project bound to your applications spreadsheet.
// Run setup once, then deploy as a web app. See docs/GOOGLE_SHEETS_SETUP.md.
const HEADERS = [
  'ID заявки', 'Получено (UTC)', 'Имя', 'Кто обращается', 'Контакт',
  'Задача', 'Класс', 'Комментарий', 'Статус',
  'UTM source', 'UTM medium', 'UTM campaign', 'UTM content',
  'Согласие получено (UTC)', 'Текст согласия', 'Ссылка на согласие',
  'Политика обработки данных',
];
const TASK_LABELS = {
  direction: 'Пока не знаю, что после школы',
  route: 'Выбираю маршрут',
  exams: 'Нужна подготовка',
  other: 'Другой вопрос',
};

function setup() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Откройте скрипт через Расширения → Apps Script в таблице.');
  const existingId = properties.getProperty('SPREADSHEET_ID');
  if (existingId && existingId !== spreadsheet.getId())
    throw new Error('Скрипт уже настроен на другую таблицу. Проверьте SPREADSHEET_ID.');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheetName = properties.getProperty('SHEET_NAME') || 'Заявки';
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    if (sheet.getMaxColumns() < HEADERS.length)
      sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    checkHeaders_(sheet);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setBackground('#edf1fb').setFontColor('#222a35').setFontWeight('bold').setWrap(true);
    sheet.setRowHeight(1, 42);
    sheet.setColumnWidths(1, HEADERS.length, 180);
    sheet.setColumnWidth(1, 290);
    sheet.setColumnWidth(5, 240);
    sheet.setColumnWidth(8, 360);
    sheet.setColumnWidth(15, 360);
    if (!sheet.getFilter()) sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
    sheet.getRange(2, 9, sheet.getMaxRows() - 1, 1).setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(['Новая', 'Связались', 'В работе', 'Закрыта'], true)
        .setAllowInvalid(false).build(),
    );
    properties.setProperties({ SPREADSHEET_ID: spreadsheet.getId(), SHEET_NAME: sheetName });
    if (!properties.getProperty('WEBHOOK_TOKEN')) {
      properties.setProperty('WEBHOOK_TOKEN',
        (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''));
    }
    SpreadsheetApp.flush();
    // The token stays in Script Properties; never log it or return it via HTTP.
    return 'Готово. WEBHOOK_TOKEN находится в настройках проекта → Свойства скрипта.';
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  // Does not expose records, a spreadsheet ID, or configuration.
  return json_({ ok: true, service: 'meta-applications', version: 1 });
}

function doPost(event) {
  let lock;
  let locked = false;
  try {
    const raw = event && event.postData && event.postData.contents;
    if (typeof raw !== 'string' || raw.length > 20000)
      return json_({ ok: false, error: 'invalid_request' });
    const body = JSON.parse(raw);
    const properties = PropertiesService.getScriptProperties();
    const token = properties.getProperty('WEBHOOK_TOKEN');
    if (!token || token.length < 32 || !body || body.token !== token)
      return json_({ ok: false, error: 'unauthorized' });
    if (!validPayload_(body)) return json_({ ok: false, error: 'invalid_request' });
    const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
    const sheetName = properties.getProperty('SHEET_NAME');
    if (!spreadsheetId || !sheetName) return json_({ ok: false, error: 'not_configured' });

    lock = LockService.getScriptLock();
    locked = lock.tryLock(5000);
    if (!locked) return json_({ ok: false, error: 'busy' });
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    if (!sheet) return json_({ ok: false, error: 'not_configured' });
    checkHeaders_(sheet);
    const lastRow = sheet.getLastRow();
    // The persistent ID column and script lock cover retries and concurrent requests.
    if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
      .createTextFinder(body.requestId).matchEntireCell(true).useRegularExpression(false).findNext()) {
      return json_({ ok: true, requestId: body.requestId, duplicate: true });
    }

    const source = body.source || {};
    const row = [
      body.requestId, new Date().toISOString(), body.name,
      body.role === 'parent' ? 'Родитель' : 'Школьник', body.contact,
      TASK_LABELS[body.task] || 'Не указана', body.grade || '', body.comment || '', 'Новая',
      source.utm_source || '', source.utm_medium || '', source.utm_campaign || '', source.utm_content || '',
      body.consent.at, body.consent.text, body.consent.url, body.consent.privacyUrl,
    ];
    const nextRow = lastRow + 1;
    if (nextRow > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1000);
    // Rich text preserves phone numbers, leading zeros and '=' as literal text.
    // Applicant text must never become a spreadsheet formula.
    sheet.getRange(nextRow, 1, 1, row.length).setRichTextValues([
      row.map(function (value) { return SpreadsheetApp.newRichTextValue().setText(String(value)).build(); }),
    ]).setVerticalAlignment('top').setWrap(true);
    SpreadsheetApp.flush();
    return json_({ ok: true, requestId: body.requestId });
  } catch {
    // Do not leak or log submitted contact data, secrets or exception contents.
    return json_({ ok: false, error: 'storage_error' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function checkHeaders_(sheet) {
  const headers = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (!HEADERS.every(function (header, index) { return headers[index] === header; }))
    throw new Error('Столбцы листа не совпадают со схемой заявок. Не меняйте их порядок и названия.');
}

function validPayload_(body) {
  const text = function (value, max, required) {
    return typeof value === 'string' && value.length <= max && (!required || value.trim().length > 0);
  };
  if (!text(body.name, 100, true) || !text(body.contact, 200, true) ||
    !['student', 'parent'].includes(body.role) ||
    !text(body.task, 30, false) || (body.task && !Object.prototype.hasOwnProperty.call(TASK_LABELS, body.task)) ||
    !text(body.grade, 40, false) || !text(body.comment, 2000, false) ||
    !text(body.requestId, 36, true) ||
    !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(body.requestId)) return false;
  const consent = body.consent;
  if (!consent || consent.accepted !== true || !text(consent.text, 4000, true) ||
    !text(consent.at, 40, true) || !Number.isFinite(Date.parse(consent.at)) ||
    !text(consent.url, 2000, true) || !text(consent.privacyUrl, 2000, true)) return false;
  if (body.source != null) {
    if (typeof body.source !== 'object' || Array.isArray(body.source)) return false;
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      if (body.source[key] !== undefined && !text(body.source[key], 200, false)) return false;
    }
  }
  return true;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
