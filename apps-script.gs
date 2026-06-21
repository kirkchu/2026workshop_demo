function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    const headers = ["時間戳記", "姓名", "email", "電話", "單位", "職稱"];

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    sheet.getRange("D:D").setNumberFormat("@");

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      String(data.phone || ""),
      data.organization || "",
      data.jobTitle || ""
    ]);

    return jsonResponse({ status: "success" });
  } catch (error) {
    return jsonResponse({ status: "error", message: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ status: "ready" });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
