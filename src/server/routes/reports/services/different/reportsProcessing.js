import wbapi from "../WBAPI/index.js";
import sortYearsTree from "./sortYearTree.js";
import parseReports from "../reportParsing/index.js";
import parseJwt from "../../../WBToken/services/parseJwt.js";
import { WBAPIError } from "../../../../customError/index.js";
import addNewSkusToListGoods from "./addNewSkusToListGoods.js";
import dbutils from "../../../../database/collections/index.js";
import insertReportToReportTree from "../reportTreeBuilder/index.js";
import updateListGoodsMetrics from "../different/updateListGoodsMetrics.js";
import { recordedToSchemaVersion, reportSchemaVersion } from "../../../../database/migration/schemaVersioning/reportsCollection.js";

var { getWBTokenByUserId } = dbutils.tokenCollectionServices;
var { saveReportToDb } = dbutils.reportCollectionServices;
var { getListGoodsFromDb, saveListGoodsToDb } = dbutils.goodsCollectionServices;
var { getReportTree, updateReportTree } = dbutils.reportsTreeCollectionServices;
var { addNewTaxYearToDb, changeTaxParamsToDb } = dbutils.taxParamsCollectionServices;
var { setLastReportRequestTimestamp, addReportToEmptyReportPeriods } = dbutils.reportLoadingStatesCollectionServices;

var updateWBTokenLastUsedTimestampNow = true;
var invalidTokenErrorMsg = "Invalid Token";
var mskTimeOffsetInMs = 10_800_000;

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

  var reportPeriodIsEmpty = false;
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;
  var { reportId } = reports.weeklyFinancialReport[0];

  if (isCrossYearPeriod) {
    var startYearTaxParams = await addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams, isCrossYearPeriod);
    reportPeriodIsEmpty = !report.skus.length;

    if (!reportPeriodIsEmpty) {
      await changeTaxParamsToDb(userId, session, recalculatedTaxParams.startYearTaxParams, recalculatedTaxParams.endYearTaxParams);
    }
  } else {
    var taxParams = await addNewTaxYearToDb(userId, startYear, session);
    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams);

    reportPeriodIsEmpty = !report.skus.length;

    if (!reportPeriodIsEmpty) {
      await changeTaxParamsToDb(userId, session, recalculatedTaxParams);
    }
  }

  if (reportPeriodIsEmpty) {
    await addReportToEmptyReportPeriods(userId, dateFrom, dateTo, session);
    return { reportPeriodIsEmpty, reportData: {} };
  }

  var { reportTree } = await getReportTree(userId, session);

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.reportIsEmpty = !report.skus.length;
  report.schemaVersion = reportSchemaVersion;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.recordedTo = { year, month, schemaVersion: recordedToSchemaVersion };

  await saveReportToDb(userId, report, session);
  await updateReportTree(userId, sortedYears, session);

  if (!isReportFromFile) {
    await setLastReportRequestTimestamp(userId, session);
  }

  var { listGoods } = await getListGoodsFromDb(userId, session);

  if (listGoods.length) {
    var { listGoodsWithNewSkus } = addNewSkusToListGoods(listGoods, skuNamesAndIds, isCrossYearPeriod, startYear, endYear);
    var { listGoodsWithUpdatedSkuMetrics } = updateListGoodsMetrics(report, listGoodsWithNewSkus);

    await saveListGoodsToDb(userId, listGoodsWithUpdatedSkuMetrics, session);
  }

  return { reportPeriodIsEmpty, reportData: { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount } };
};

export default reportsProcessing;
