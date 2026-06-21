# 2026時間設計半日工作坊

活動報名網站。GitHub Pages 網址：

https://kirkchu.github.io/2026workshop_demo/

## Google Sheet 與 Apps Script 部署

1. 建立一個新的 Google Sheet。
2. 在 Google Sheet 選擇「擴充功能」→「Apps Script」。
3. 將本專案的 `apps-script.gs` 內容貼到 Apps Script 編輯器。
4. 儲存專案，按「部署」→「新增部署作業」。
5. 類型選擇「網頁應用程式」。
6. 「執行身分」選擇「我」。
7. 「誰可以存取」選擇「任何人」。
8. 按「部署」，依畫面完成 OAuth 驗證與授權。
9. 完成後複製 Web App URL，貼回給我，我會接上表單並進行驗證與測試。

注意：Apps Script 會操作第一個工作表，並自動建立標題列；「電話」欄會設定為文字型態。
