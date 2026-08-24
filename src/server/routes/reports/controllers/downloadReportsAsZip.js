import JSZip from "jszip";
import dbUtils from "../../../database/modelsUtil/index.js";
import { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer } from "../services/reportAsXLSXBuffer/index.js";

var session = null;
var folderName = "Отчёты";
var mainFileName = "Сводка.xlsx";
var selectedFields = ["reports.reportId", "reports.skus", "reports.dateFrom", "reports.dateTo"];

var { getReportsByUserId } = dbUtils.reportModelUtils;

var downloadReportsAsZip = async (req, res, next) => {
  var { userId, reportIds } = req.body;

  var { reports } = await getReportsByUserId(userId, session, selectedFields, reportIds);

  var zip = new JSZip();
  var folder = zip.folder(folderName);

  for (var report of reports) {
    var { buffer } = await getReportAsXLSXBuffer(report);

    var fileNameForSeparateReport = `Детали отчета от ${report.dateFrom} по ${report.dateTo}.xlsx`;

    folder.file(fileNameForSeparateReport, buffer);
  }

  var { buffer } = await getMonthlySummaryAsXLSXBuffer(reports);

  folder.file(mainFileName, buffer);

  var zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

  res.set({
    "Content-Type": "application/zip",
    "Content-Length": zipBuffer.length,
    "Content-Disposition": 'attachment; filename="reports.zip"',
  });

  return res.send(zipBuffer);
};

export default downloadReportsAsZip;
