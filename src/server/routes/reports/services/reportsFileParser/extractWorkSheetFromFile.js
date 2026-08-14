import ExcelJs from "exceljs";
import getReportPeriod from "./getReportPeriod.js";
import generateColumnNames from "./generateColumnNames.js";
import { checkAndFixMonday, checkAndFixSunday } from "./checkDate.js";
import requiredColumnsNameCountIsValid from "./requiredColumnsNameCountIsValid.js";
import getReportPeriodFromPaidStorageReportFile from "./getReportPeriodFromPaidStorageReportFile.js";
import getRequiredColumnsNameFromPaidStorageReportFile from "./getRequiredColumnsNameFromPaidStorageReportFile.js";
import getRequiredColumnsNameFromWeeklyFinanfialReportFile from "./getRequiredColumnsNameFromWeeklyFinanfialReportFile.js";

var requiredColumnsCountToPaidStorageReport = 4;
var requiredColumnsCountToWeeklyFinancialReport = 15;

var requiredWeeklyFinancialReportFileWorkSheetName = "Sheet1";
var requiredPaidStorageReportFileWorkSheetName = "Детальная информация";

var extractWorkSheetFromFile = async (weeklyFinancialReportsBuffer, paidStorageReportsBuffer) => {
  var workSheets = [];

  for (var { reportId, buffer } of weeklyFinancialReportsBuffer) {
    var wb = new ExcelJs.Workbook();
    await wb.xlsx.load(buffer);
    var workSheet = wb.getWorksheet(requiredWeeklyFinancialReportFileWorkSheetName);

    if (!workSheet.actualColumnCount) {
      continue;
    }

    var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
    var { requiredColumnsName } = getRequiredColumnsNameFromWeeklyFinanfialReportFile(workSheet, columnsNames);

    if (requiredColumnsNameCountIsValid(requiredColumnsName, requiredColumnsCountToWeeklyFinancialReport)) {
      var { dateFrom, dateTo } = getReportPeriod(workSheet, requiredColumnsName);
      var { dateFrom } = checkAndFixMonday(dateFrom);
      var { dateTo } = checkAndFixSunday(dateTo);

      var existReportPeriod = workSheets.find((item) => item?.dateFrom >= dateFrom && item?.dateTo >= dateTo);

      if (existReportPeriod) {
        var equalReportIsExist = existReportPeriod.onePeriodReports.weeklyFinancialReports.find((item) => item.reportId === reportId);

        if (!equalReportIsExist) {
          existReportPeriod.onePeriodReports.weeklyFinancialReports.push({
            dateFrom,
            dateTo,
            reportId,
            workSheet,
            workSheetData: { columnsNames, requiredColumnsName },
          });
        }
      } else {
        workSheets.push({
          dateFrom,
          dateTo,
          onePeriodReports: {
            weeklyFinancialReports: [{ dateFrom, dateTo, reportId, workSheet, workSheetData: { columnsNames, requiredColumnsName } }],
          },
        });
      }
    }
  }

  if (weeklyFinancialReportsBuffer.length) {
    for (var buffer of paidStorageReportsBuffer) {
      var wb = new ExcelJs.Workbook();
      await wb.xlsx.load(buffer);
      var workSheet = wb.getWorksheet(requiredPaidStorageReportFileWorkSheetName);

      if (!workSheet.actualColumnCount) {
        continue;
      }

      var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
      var { requiredColumnsName } = getRequiredColumnsNameFromPaidStorageReportFile(workSheet, columnsNames);

      if (requiredColumnsNameCountIsValid(requiredColumnsName, requiredColumnsCountToPaidStorageReport)) {
        var { dateFrom, dateTo } = getReportPeriodFromPaidStorageReportFile(workSheet, requiredColumnsName);
        var { dateFrom } = checkAndFixMonday(dateFrom);
        var { dateTo } = checkAndFixSunday(dateTo);

        var existReportPeriod = workSheets.find((item) => item?.dateFrom >= dateFrom && item?.dateTo >= dateTo);

        if (existReportPeriod) {
          if (!existReportPeriod.onePeriodReports?.paidStorageReports) {
            var paidStorageReports = [
              {
                dateFrom,
                dateTo,
                workSheet,
                workSheetData: { requiredColumnsName },
              },
            ];

            existReportPeriod.onePeriodReports.paidStorageReports = paidStorageReports;
          } else {
            var hasPaidStorageReportForPeriod = existReportPeriod.onePeriodReports.paidStorageReports.find(
              (paidStorageReport) => paidStorageReport.dateFrom === dateFrom && paidStorageReport.dateTo === dateTo,
            );

            if (!hasPaidStorageReportForPeriod) {
              existReportPeriod.onePeriodReports.paidStorageReports.push({
                dateFrom,
                dateTo,
                workSheet,
                workSheetData: { requiredColumnsName },
              });
            }
          }
        }
      }
    }
  }

  return { workSheets };
};

export default extractWorkSheetFromFile;
