import loadExcelLibs from "../../loadExcelLibs.js";
import getReportsFromLocalStorage from "../../getReportsFromLocalStorage.js";
import generateReportXlsxBuffer from "../reportToXlsxBuffer/generateReportXlsxBuffer.js";

var fileName = `Отчеты.zip`;

var downloadReportsInZip = async () => {
  var { JSZip } = await loadExcelLibs();
  var { reports } = getReportsFromLocalStorage();

  var zip = new JSZip();
  var folder = zip.folder("Отчёты");

  for (var report of reports) {
    var { buffer } = await generateReportXlsxBuffer(report);

    var fileNameForSeparateReport = `Расшифровка отчета с ${report.dateFrom} по ${report.dateTo} .xlsx`;

    folder.file(fileNameForSeparateReport, buffer);
  }

  var zipBuffer = await zip.generateAsync({
    type: "arrayBuffer",
    compression: "DEFLATE",
  });

  var blob = new Blob([zipBuffer]);

  var downloadUrl = window.URL.createObjectURL(blob);

  var a = document.createElement("a");
  a.href = downloadUrl;

  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(downloadUrl);

  a.remove();
};

export default downloadReportsInZip;
