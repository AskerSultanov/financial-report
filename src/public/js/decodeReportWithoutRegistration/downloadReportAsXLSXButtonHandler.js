import loadExcelLibs from "./loadExcelLibs.js";
import { generateReportXlsxBuffer } from "./utils/reportToXlsxBuffer/index.js";

var buttonId = "download-report-as-xlsx-button";
var button = document.getElementById(buttonId);

var downloadReportAsXlsxButtonHandler = (report) => {
  button.onclick = async () => {
    await loadExcelLibs();

    var { buffer } = await generateReportXlsxBuffer(report);

    var blob = new Blob([buffer]);
    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;

    var fileName = `Расшифровка отчета с ${report.dateFrom} по ${report.dateTo} .xlsx`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  };
};
export default downloadReportAsXlsxButtonHandler;
