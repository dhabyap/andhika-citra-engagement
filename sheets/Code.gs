/**
 * RSVP undangan Citra & Dhika — simpan ke Google Sheets + feed ucapan publik.
 *
 * CARA PAKAI (lihat README.md bagian "Sambungkan RSVP ke Google Sheets"):
 *   1. Buat Google Sheets baru, beri nama tab "RSVP".
 *   2. Extensions > Apps Script, hapus isi Code.gs, tempel file ini.
 *   3. Deploy > New deployment > Web app:
 *        - Execute as      : Me
 *        - Who has access  : Anyone
 *      Salin URL /exec-nya.
 *   4. Tempel URL itu ke CONFIG.RSVP_ENDPOINT di designs/*.html.
 *
 * Feed publik (doGet?action=wishes) hanya mengirim nama + ucapan.
 * Nomor HP dan jumlah tamu TIDAK pernah ikut dipublikasikan.
 */

var SHEET_NAME = "RSVP";
var MAX_WISHES = 6;

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Waktu", "Nama", "Konfirmasi", "Jumlah", "HP", "Ucapan"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var nama = String(data.nama || "").trim();
    if (!nama) return json_({ ok: false, error: "nama wajib diisi" });

    sheet_().appendRow([
      new Date(),
      nama,
      String(data.status || "Hadir"),
      Number(data.jumlah) || 1,
      String(data.hp || "").trim(),
      String(data.ucapan || "").trim()
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "";

  // Endpoint sehat-check (dipakai browser untuk memastikan deployment benar).
  if (action !== "wishes") {
    return json_({ ok: true, service: "rsvp", time: new Date().toISOString() });
  }

  var values = sheet_().getDataRange().getValues();
  var out = [];
  for (var i = values.length - 1; i >= 1 && out.length < MAX_WISHES; i--) {
    var ucapan = String(values[i][5] || "").trim(); // kolom F = Ucapan
    if (!ucapan) continue;
    out.push({ nama: String(values[i][1] || "").trim(), ucapan: ucapan }); // hanya nama + ucapan
  }
  return json_({ ok: true, wishes: out });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
