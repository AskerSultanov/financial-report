import doRequest from "../../../utils/doRequest.js";

var url = "/report/zip/";

var createMonthlyReportDownloadButton = (userId, year, month, reportIds) => {
  reportIds = extractNumericReportIds(reportIds);

  var button = document.createElement("button");

  button.id = reportIds;
  button.textContent = "Отчеты за месяц";
  button.className = "download-monthly-reports-button";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await doRequest(url, {
      method: "POST",
      body: JSON.stringify({ userId, reportIds }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status !== 200) {
      alert("Не удалось создать месячную сводку...");
      return;
    }

    var blob = await res.blob();

    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;

    var fileName = `Отчеты за ${month} ${year}г`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  });

  return button;
};

export default createMonthlyReportDownloadButton;

var extractNumericReportIds = function (reportIds) {
  if (Number.isFinite(reportIds[0])) {
    return reportIds;
  }

  return reportIds.map(({ reportId }) => reportId);
};
