import processReportSkus from "../reportParsing/index.js";
import getNewSkusToListGoods from "./getNewSkusToListGoods.js";
import dbutils from "../../../../database/modelsUtil/index.js";
import getReportTargetYearAndMonth from "./getReportTargetYearAndMonth.js";

var { saveReportToDb } = dbutils.reportModelUtils;
var { addReportToReportPeriods } = dbutils.reportPeriodsModelUtils;
var { getListGoodsFromDb, saveNewSkusToDb } = dbutils.goodsModelUtils;
var { addNewTaxYearToDb, updateTaxParamsToDb } = dbutils.taxParamsModelUtils;
var { setLastReportRequestTimestamp, addReportToEmptyReportPeriods } = dbutils.reportLoadingStateModelUtils;

var selectedFields = ["listGoods.id", "listGoods.skuName"];
var monthList = ["январь", "февраль", "марта", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

var reportsProcessing = async (userId, dateFrom, dateTo, session, reports, isReportFromFile = false) => {
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var reportSkus = [];
  var updatedTaxParams = [];
  var { reportId } = reports.weeklyFinancialReport[0];
  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(dateFrom, dateTo);

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var taxParams = await addNewTaxYearToDb(userId, currentYear, session);
    var { skus, recalculatedTaxParams } = await processReportSkus(reports, taxParams, isCrossYearPeriod);

    reportSkus.push(...skus);
    updatedTaxParams.push({ year: currentYear, data: recalculatedTaxParams });
  }

  var report = {};
  report.skus = reportSkus;

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.reportIsEmpty = !report.skus.length;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.recordedTo = { year: targetYear, month: monthList[targetMonthIndex] };

  var newReportPeriod = { reportId, dateFrom, dateTo, year: targetYear, monthIndex: targetMonthIndex, monthName: monthList[targetMonthIndex] };

  await saveReportToDb(report, session);
  await addReportToReportPeriods(userId, newReportPeriod, session);

  if (!isReportFromFile) {
    await setLastReportRequestTimestamp(userId, session);
  }

  if (report.skus.length) {
    await updateTaxParamsToDb(userId, updatedTaxParams, session);

    var skuNames = report.skus.map((sku) => sku.skuName);

    var { listGoods } = await getListGoodsFromDb(userId, skuNames, selectedFields, session);

    var skuNamesAndIds = reportSkus.map((sku) => {
      return { name: sku.skuName, id: sku.id };
    });

    var { newSkus } = getNewSkusToListGoods(listGoods, skuNamesAndIds);

    if (newSkus.length) {
      await saveNewSkusToDb(userId, newSkus, session);
    }
  } else {
    await addReportToEmptyReportPeriods(userId, dateFrom, dateTo, session);
    return { reportPeriodIsEmpty: report.reportIsEmpty, reportData: {} };
  }

  return {
    reportPeriodIsEmpty: report.reportIsEmpty,
    reportData: { reportId, dateFrom, dateTo, month: monthList[targetMonthIndex], year: targetYear },
  };
};

export default reportsProcessing;
