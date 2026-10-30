import doRequest from "../utils/doRequest.js";

var url = "/report/xlsx/";
var button = document.getElementById("download-report-as-xlsx-button");

var downloadReportAsXLSXButtonHandler = (report) =>
  (button.onclick = async (e) => {
    e.preventDefault();

    var { userId, reportId, dateFrom, dateTo } = report;

    var res = await doRequest(url, {
      method: "POST",
      body: JSON.stringify({ userId, reportId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status !== 200) {
      return alert("Не удалось скачать отчет...");
    }

    var blob = await res.blob();
    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;

    var fileName = `Расшифровка отчета с ${dateFrom} по ${dateTo} .xlsx`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  });

export default downloadReportAsXLSXButtonHandler;
