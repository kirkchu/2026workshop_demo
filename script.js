const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxp9ipxad7Oz0PJ5r7Kw8nn6XLtMM89gRJK8ck_k8l7elD_58u58prAZk80R2QbB2yFgA/exec";

const form = document.querySelector("#registration-form");
const message = document.querySelector("#form-message");

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `form-message ${type}`.trim();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!GOOGLE_SCRIPT_URL) {
    setMessage("尚未設定 Google Apps Script Web App URL。", "error");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  const payload = Object.fromEntries(new FormData(form).entries());

  submitButton.disabled = true;
  setMessage("送出中...");

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Apps Script 未回傳 JSON，請確認 Web App 存取權已設定為任何人。");
    }

    if (!response.ok || result.status !== "success") {
      throw new Error(result.message || "表單送出失敗");
    }

    form.reset();
    setMessage("報名成功，感謝你的填寫！", "success");
  } catch (error) {
    setMessage(`送出失敗：${error.message}`, "error");
  } finally {
    submitButton.disabled = false;
  }
});
