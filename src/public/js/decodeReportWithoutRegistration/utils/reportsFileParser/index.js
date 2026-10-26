import reportsProcessing from "./reportsProcessing.js";
import removeDublicateFiles from "./removeDublicateFiles.js";
import extractWorkSheetFromFile from "./extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "./extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "./extractReportDataFromWorkSheets.js";

var reportFileParser = async (files) => {
  var { deduplicatedFiles } = removeDublicateFiles(files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } =
    await extractReportsFileBufferFromZip(deduplicatedFiles);

  var { workSheets } = await extractWorkSheetFromFile(
    weeklyFinancialReportsBuffer,
    paidStorageReportsBuffer,
  );

  var reportsData = [];

  for (var { dateFrom, dateTo, onePeriodReports } of workSheets) {
    var { reports, reportPeriodIsEmpty } =
      await extractReportDataFromWorkSheets(onePeriodReports);

    if (!reportPeriodIsEmpty) {
      var resultOfReportProcessing = await reportsProcessing(
        dateFrom,
        dateTo,
        reports,
      );

      if (!resultOfReportProcessing.reportPeriodIsEmpty) {
        reportsData.push(resultOfReportProcessing.report);
      }
    }
  }

  return { reportsData };
};

export default reportFileParser;
