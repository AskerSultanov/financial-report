import sortYearsTree from "./sortYearTree.js";
import processReportSkus from "../reportParsing/index.js";
import getNewSkusToListGoods from "./getNewSkusToListGoods.js";
import dbutils from "../../../../database/modelsUtil/index.js";
import insertReportToReportTree from "../reportTreeBuilder/index.js";

var { saveReportToDb } = dbutils.reportModelUtils;
var { getListGoodsFromDb, saveNewSkusToDb } = dbutils.goodsModelUtils;
var { getReportTree, updateReportTree } = dbutils.reportsTreeModelUtils;
var { addNewTaxYearToDb, updateTaxParamsToDb } = dbutils.taxParamsModelUtils;
var { setLastReportRequestTimestamp, addReportToEmptyReportPeriods } = dbutils.reportLoadingStateModelUtils;

var selectedFields = ["listGoods.id", "listGoods.skuName"];

var reportsProcessing = async (userId, dateFrom, dateTo, session, reports, isReportFromFile = false) => {
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;
  var { reportId } = reports.weeklyFinancialReport[0];

  var reportSkus = [];
  var updatedTaxParams = [];

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var taxParams = await addNewTaxYearToDb(userId, currentYear, session);
    var { skus, recalculatedTaxParams } = await processReportSkus(reports, taxParams, isCrossYearPeriod);

    reportSkus.push(...skus);
    updatedTaxParams.push({ year: currentYear, data: recalculatedTaxParams });
  }

  var report = {};
  report.skus = reportSkus;

  var { reportTree } = await getReportTree(userId, session);

  var { years, year, month } = insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.recordedTo = { year, month };
  report.reportIsEmpty = !report.skus.length;
  report.isCrossYearPeriod = isCrossYearPeriod;

  await saveReportToDb(report, session);
  await updateReportTree(userId, sortedYears, session);

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

  return { reportPeriodIsEmpty: report.reportIsEmpty, reportData: { reportId, year, month, dateFrom, dateTo } };
};

export default reportsProcessing;
