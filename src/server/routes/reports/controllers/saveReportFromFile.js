import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";
import checkReportExistsInTree from "../services/different/checkReportExistsInTree.js";
import removeDublicateFiles from "../services/reportsFileParser/removeDublicateFiles.js";
import extractWorkSheetFromFile from "../services/reportsFileParser/extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "../services/reportsFileParser/extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "../services/reportsFileParser/extractReportDataFromWorkSheets.js";

var { getReportTree } = dbUtils.reportsTreeModelUtils;
var { getEmptyReportPeriods, addReportToEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var isReportFromFile = true;

var saveReportFromFile = async (req, res, next) => {
  var { userId } = req.body;

  var { deduplicatedFiles } = removeDublicateFiles(req.files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } = await extractReportsFileBufferFromZip(deduplicatedFiles);
  var { workSheets } = await extractWorkSheetFromFile(weeklyFinancialReportsBuffer, paidStorageReportsBuffer);

  var reportsData = [];

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { reportTree } = await getReportTree(userId, session);
      var { emptyReportPeriods } = await getEmptyReportPeriods(userId, session);

      for (var { dateFrom, dateTo, onePeriodReports } of workSheets) {
        var reportExistInEmptyReportPeriods = emptyReportPeriods.find((item) => item.dateFrom === dateFrom);

        if (!reportExistInEmptyReportPeriods) {
          var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

          if (!reportIsExist) {
            var { reports, reportPeriodIsEmpty } = await extractReportDataFromWorkSheets(userId, onePeriodReports);

            if (!reportPeriodIsEmpty) {
              var resultOfReportProcessing = await reportsProcessing(userId, dateFrom, dateTo, session, reports, isReportFromFile);

              if (resultOfReportProcessing.reportPeriodIsEmpty) {
                await addReportToEmptyReportPeriods(userId, dateFrom, dateTo, session);
              } else {
                reportsData.push(resultOfReportProcessing.reportData);
              }
            } else {
              await addReportToEmptyReportPeriods(userId, dateFrom, dateTo, session);
            }
          }
        }
      }
    });

    res.json({ reportsData });
  } catch (e) {
    console.log({ e });
    res.sendStatus(500);
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
};

export default saveReportFromFile;
