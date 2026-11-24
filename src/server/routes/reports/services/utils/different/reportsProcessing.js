import processReportSkus from "../reportParsing/index.js";
import getNewSkusToListGoods from "./getNewSkusToListGoods.js";
import dbutils from "../../../../../database/modelsUtil/index.js";
import getReportTargetYearAndMonth from "./getReportTargetYearAndMonth.js";

var { createReport } = dbutils.basicReportsDataModelUtils;
var { getListGoodsFromDb, saveNewSkusToDb } = dbutils.goodsModelUtils;
var { addNewUserTaxSetting, updateTaxSettings } = dbutils.taxSettingModelUtils;
var { setLastReportRequestTimestamp, addReportToEmptyReportPeriods } =
  dbutils.reportLoadingStateModelUtils;

var selectedFields = ["listGoods.id", "listGoods.skuName"];

var monthList = [
  "январь",
  "февраль",
  "марта",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

var reportsProcessing = async (
  userId,
  dateFrom,
  dateTo,
  session,
  reports,
  isReportFromFile = false,
) => {
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var reportSkus = [];
  var updatedTaxSettings = [];

  var { reportId } = reports.weeklyFinancialReport[0];
  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(
    dateFrom,
    dateTo,
  );

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var { taxSetting } = await addNewUserTaxSetting(
      userId,
      currentYear,
      session,
    );

    var { skus, recalculatedTaxSetting } = await processReportSkus(
      reports,
      taxSetting,
      isCrossYearPeriod,
    );

    reportSkus.push(...skus);

    updatedTaxSettings.push({
      year: currentYear,
      data: recalculatedTaxSetting,
    });
  }

  if (!reportSkus.length) {
    await addReportToEmptyReportPeriods(userId, dateFrom, dateTo, session);

    return { reportPeriodIsEmpty: true, reportData: {} };
  }

  var basicReportData = {};

  basicReportData.userId = userId;
  basicReportData.reportId = reportId;
  basicReportData.dateFrom = dateFrom;
  basicReportData.dateTo = dateTo;
  basicReportData.year = targetYear;
  basicReportData.monthIndex = targetMonthIndex;
  basicReportData.isCrossYearPeriod = isCrossYearPeriod;

  await createReport(basicReportData, reportSkus, session);

  if (!isReportFromFile) {
    await setLastReportRequestTimestamp(userId, session);
  }

  await updateTaxSettings(userId, updatedTaxSettings, session);

  var skuNames = reportSkus.map((sku) => sku.skuName);

  var { listGoods } = await getListGoodsFromDb(
    userId,
    skuNames,
    selectedFields,
    session,
  );

  var skuNamesAndIds = reportSkus.map((sku) => {
    return { name: sku.skuName, id: sku.id };
  });

  var { newSkus } = getNewSkusToListGoods(listGoods, skuNamesAndIds);

  if (newSkus.length) {
    await saveNewSkusToDb(userId, newSkus, session);
  }

  return {
    reportPeriodIsEmpty: false,
    reportData: {
      reportId,
      dateFrom,
      dateTo,
      year: targetYear,
      month: monthList[targetMonthIndex],
    },
  };
};

export default reportsProcessing;
