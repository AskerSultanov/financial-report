import wbapi from "../WBAPI/index.js";
import sortYearsTree from "./sortYearTree.js";
import parseReports from "../reportParsing/index.js";
import parseJwt from "../../../WBToken/services/parseJwt.js";
import { WBAPIError } from "../../../../customError/index.js";
import getNewSkusToListGoods from "./getNewSkusToListGoods.js";
import dbutils from "../../../../database/modelsUtil/index.js";
import insertReportToReportTree from "../reportTreeBuilder/index.js";

var { saveReportToDb } = dbutils.reportModelUtils;
var { getWBTokenByUserId } = dbutils.tokenModelUtils;
var { getListGoodsFromDb, saveNewSkusToDb } = dbutils.goodsModelUtils;
var { getReportTree, updateReportTree } = dbutils.reportsTreeModelUtils;
var { addNewTaxYearToDb, updateTaxParamsToDb } = dbutils.taxParamsModelUtils;
var { setLastReportRequestTimestamp, addReportToEmptyReportPeriods } = dbutils.reportLoadingStateModelUtils;

var mskTimeOffsetInMs = 10_800_000;
var invalidTokenErrorMsg = "Invalid Token";
var updateWBTokenLastUsedTimestampNow = true;
var selectedFields = ["listGoods.id", "listGoods.skuName"];

var reportsProcessing = async (userId, dateFrom, dateTo, session, reports, isReportFromFile = false) => {
  if (!isReportFromFile) {
    var currentTimestamp = Date.now() + mskTimeOffsetInMs;

    var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);

    var tokenPayload = parseJwt(token);

    if (!tokenPayload?.exp || tokenPayload.exp * 1000 <= currentTimestamp) {
      throw new WBAPIError(userId, 401, invalidTokenErrorMsg);
    }

    reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
  }

  var report = {};
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;
  var { reportId } = reports.weeklyFinancialReport[0];

  var updatedTaxParams = [];

  if (isCrossYearPeriod) {
    var startYearTaxParams = await addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { skus, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams, isCrossYearPeriod);

    report.skus = skus;
    updatedTaxParams.push({ year: startYear, data: recalculatedTaxParams.startYearTaxParams });
    updatedTaxParams.push({ year: endYear, data: recalculatedTaxParams.endYearTaxParams });
  } else {
    var taxParams = await addNewTaxYearToDb(userId, startYear, session);
    var { skus, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams);

    report.skus = skus;
    updatedTaxParams.push({ year: startYear, data: recalculatedTaxParams });
  }

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
