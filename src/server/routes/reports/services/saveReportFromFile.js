import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import reportsProcessing from "./utils/different/reportsProcessing.js";
import removeDublicateFiles from "./utils/reportsFileParser/removeDublicateFiles.js";
import extractWorkSheetFromFile from "./utils/reportsFileParser/extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "./utils/reportsFileParser/extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "./utils/reportsFileParser/extractReportDataFromWorkSheets.js";

var { checkReportExistByDate } = dbUtils.reportPeriodsModelUtils;
var { getEmptyReportPeriods, addReportToEmptyReportPeriods } =
  dbUtils.reportLoadingStateModelUtils;

var isReportFromFile = true;

var saveReportFromFileService = async (userId, files) => {
  var { deduplicatedFiles } = removeDublicateFiles(files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } =
    await extractReportsFileBufferFromZip(deduplicatedFiles);
  var { workSheets } = await extractWorkSheetFromFile(
    weeklyFinancialReportsBuffer,
    paidStorageReportsBuffer,
  );

  var reportsData = [];

  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    var { emptyReportPeriods } = await getEmptyReportPeriods(userId, session);

    for (var { dateFrom, dateTo, onePeriodReports } of workSheets) {
      var reportExistInEmptyReportPeriods = emptyReportPeriods.find(
        (item) => item.dateFrom === dateFrom,
      );

      if (!reportExistInEmptyReportPeriods) {
        var report = await checkReportExistByDate(userId, dateFrom, session);

        if (!report) {
          var { reports, reportPeriodIsEmpty } =
            await extractReportDataFromWorkSheets(onePeriodReports);

          if (!reportPeriodIsEmpty) {
            var resultOfReportProcessing = await reportsProcessing(
              userId,
              dateFrom,
              dateTo,
              session,
              reports,
              isReportFromFile,
            );

            if (resultOfReportProcessing.reportPeriodIsEmpty) {
              await addReportToEmptyReportPeriods(
                userId,
                dateFrom,
                dateTo,
                session,
              );
            } else {
              reportsData.push(resultOfReportProcessing.reportData);
            }
          } else {
            await addReportToEmptyReportPeriods(
              userId,
              dateFrom,
              dateTo,
              session,
            );
          }
        }
      }
    }
  });

  return { reportsData };
};

export default saveReportFromFileService;
