import JSZip from "jszip";
import dbUtils from "../../../database/collections/index.js";
import { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer } from "../services/reportAsXLSXBuffer/index.js";

var session = null;
var folderName = "Отчёты";
var mainFileName = "Сводка.xlsx";
var selectedFields = [
  "reports.reportId",
  "reports.skus",
  "reports.dateFrom",
  "reports.dateTo",
  "reports.totalRetailAmount",
  "reports.totalSellerPayoutAmount",
  "reports.totalSold",
  "reports.totalReturnAmount",
  "reports.totalDeliveryCost",
  "reports.totalStorageCost",
  "reports.totalPaidAcceptance",
  "reports.totalFines",
  "reports.totalDeductionOrPayment",
  "reports.totalAdvertisingCosts",
  "reports.totalProductCosts",
  "reports.totalOtherExpenses",
  "reports.totalTaxableAmount",
  "reports.totalTaxAmount",
  "reports.totalInsuranceFee",
  "reports.totalAdditionalInsuranceFee",
  "reports.totalProfitMargin",
  "reports.totalFinalProfit",
];

var { getReportsByUserId } = dbUtils.reportCollectionServices;

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
