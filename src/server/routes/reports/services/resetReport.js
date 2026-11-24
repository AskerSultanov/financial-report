import { dbClient } from "../../../database/index.js";
import resetSkus from "./utils/different/resetSkus.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import truncateNum from "./utils/reportParsing/truncateNum.js";

var { updateSkus } = dbUtils.skuModelUtils;
var { getReport, updateReport } = dbUtils.basicReportsDataModelUtils;
var { getTaxSettingsByYears, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var resetReportService = async (userId, reportId) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { report } = await getReport(userId, reportId, session);

    if (!report) {
      return { reportNotFound: true };
    }

    var { taxSettings } = await getTaxSettingsByYears(userId, session);

    var updatedSkus = [];
    var updatedTaxSettings = [];

    var { dateFrom, dateTo, skus, isCrossYearPeriod } = report;

    if (isCrossYearPeriod) {
      var startYear = +dateFrom.split("-")[0];
      var startYearSkus = skus.filter((sku) => sku.year === startYear);
      var startYearTaxTarams = taxSettings.find((i) => i.year === startYear);

      var startYearFinalProfit = startYearTaxTarams.finalProfit;
      var startYearPaidTaxAmount = startYearTaxTarams.paidTaxAmount;
      var startYearPaidInsuranceFee = startYearTaxTarams.paidInsuranceFee;
      var startYearAdditionalInsuranceFee =
        startYearTaxTarams.additionalInsuranceFee;

      var { cleanSkusData, prevSkusData } = resetSkus(startYearSkus);
      updatedSkus.push(...cleanSkusData);

      startYearPaidTaxAmount -= prevSkusData.prevTax;
      startYearFinalProfit -= prevSkusData.prevFinalProfit;
      startYearPaidInsuranceFee -= prevSkusData.prevInsuranceFee;
      startYearAdditionalInsuranceFee -=
        prevSkusData.prevAdditionalInsuranceFee;

      var updatedStartYearTaxSetting = {
        finalProfit: startYearFinalProfit,
        paidTaxAmount: startYearPaidTaxAmount,
        paidInsuranceFee: startYearPaidInsuranceFee,
        additionalInsuranceFee: startYearAdditionalInsuranceFee,
      };

      updatedTaxSettings.push({
        year: startYear,
        data: updatedStartYearTaxSetting,
      });

      var endYear = +dateTo.split("-")[0];
      var endYearSkus = skus.filter((sku) => sku.year === endYear);
      var endYearTaxTarams = taxSettings.find((i) => i.year === endYear);

      var { cleanSkusData, prevSkusData } = resetSkus(endYearSkus);
      updatedSkus.push(...cleanSkusData);

      var endYearFinalProfit = endYearTaxTarams.finalProfit;
      var endYearPaidTaxAmount = endYearTaxTarams.paidTaxAmount;
      var endYearPaidInsuranceFee = endYearTaxTarams.paidInsuranceFee;
      var endYearAdditionalInsuranceFee =
        endYearTaxTarams.additionalInsuranceFee;

      endYearPaidTaxAmount -= prevSkusData.prevTax;
      endYearFinalProfit -= prevSkusData.prevFinalProfit;
      endYearPaidInsuranceFee -= prevSkusData.prevInsuranceFee;
      endYearAdditionalInsuranceFee -= prevSkusData.prevAdditionalInsuranceFee;

      var updatedEndYearTaxSetting = {
        finalProfit: endYearFinalProfit,
        paidTaxAmount: endYearPaidTaxAmount,
        paidInsuranceFee: endYearPaidInsuranceFee,
        additionalInsuranceFee: endYearAdditionalInsuranceFee,
      };

      updatedTaxSettings.push({
        year: endYear,
        data: updatedEndYearTaxSetting,
      });
    } else {
      var year = skus[0].year;
      var taxSetting = taxSettings.find((i) => i.year === year);

      var finalProfit = taxSetting.finalProfit;
      var paidTaxAmount = taxSetting.paidTaxAmount;
      var paidInsuranceFee = taxSetting.paidInsuranceFee;
      var additionalInsuranceFee = taxSetting.additionalInsuranceFee;

      var { cleanSkusData, prevSkusData } = resetSkus(skus);

      paidTaxAmount -= prevSkusData.prevTax;
      finalProfit -= prevSkusData.prevFinalProfit;
      paidInsuranceFee -= prevSkusData.prevInsuranceFee;
      additionalInsuranceFee -= prevSkusData.prevAdditionalInsuranceFee;

      updatedSkus.push(...cleanSkusData);

      updatedTaxSettings.push({
        year,
        data: {
          paidTaxAmount,
          finalProfit,
          paidInsuranceFee,
          additionalInsuranceFee,
        },
      });
    }

    updatedTaxSettings.forEach((item) => {
      for (var key in item.data) {
        item.data[key] = truncateNum(item.data[key]);
      }
    });

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);

    var updatedBasicReportDataField = { isFinancesAccounted: false };
    await updateReport(userId, reportId, updatedBasicReportDataField, session);

    return { reportNotFound: false };
  });
};

export default resetReportService;
