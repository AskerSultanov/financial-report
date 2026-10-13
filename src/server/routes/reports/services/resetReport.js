import { dbClient } from "../../../database/index.js";
import resetSkus from "./utils/different/resetSkus.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import truncateNum from "./utils/reportParsing/truncateNum.js";

var { getReportById, saveUpdatedReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;
var { removeReportFromAccounted } =
  dbUtils.reportsWithAccountedFinancesModelUtils;

var resetReportService = async (userId, reportId) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { report } = await getReportById(userId, reportId, session);
    var taxParams = await getTaxParamsFromDb(userId, null, session);

    var updatedSkus = [];
    var updatedTaxParams = [];

    var { dateFrom, dateTo, skus, isCrossYearPeriod } = report;

    if (isCrossYearPeriod) {
      var startYear = +dateFrom.split("-")[0];
      var startYearSkus = skus.filter((sku) => sku.year === startYear);
      var startYearTaxTarams = taxParams.find((i) => i.year === startYear);

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

      var updatedStartYearTaxParams = {
        finalProfit: startYearFinalProfit,
        paidTaxAmount: startYearPaidTaxAmount,
        paidInsuranceFee: startYearPaidInsuranceFee,
        additionalInsuranceFee: startYearAdditionalInsuranceFee,
      };

      updatedTaxParams.push({
        year: startYear,
        data: updatedStartYearTaxParams,
      });

      var endYear = +dateTo.split("-")[0];
      var endYearSkus = skus.filter((sku) => sku.year === endYear);
      var endYearTaxTarams = taxParams.find((i) => i.year === endYear);

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

      var updatedEndYearTaxParams = {
        finalProfit: endYearFinalProfit,
        paidTaxAmount: endYearPaidTaxAmount,
        paidInsuranceFee: endYearPaidInsuranceFee,
        additionalInsuranceFee: endYearAdditionalInsuranceFee,
      };

      updatedTaxParams.push({
        year: endYear,
        data: updatedEndYearTaxParams,
      });
    } else {
      var year = skus[0].year;
      var taxParam = taxParams.find((i) => i.year === year);

      var finalProfit = taxParam.finalProfit;
      var paidTaxAmount = taxParam.paidTaxAmount;
      var paidInsuranceFee = taxParam.paidInsuranceFee;
      var additionalInsuranceFee = taxParam.additionalInsuranceFee;

      var { cleanSkusData, prevSkusData } = resetSkus(skus);

      paidTaxAmount -= prevSkusData.prevTax;
      finalProfit -= prevSkusData.prevFinalProfit;
      paidInsuranceFee -= prevSkusData.prevInsuranceFee;
      additionalInsuranceFee -= prevSkusData.prevAdditionalInsuranceFee;

      updatedSkus.push(...cleanSkusData);

      updatedTaxParams.push({
        year,
        data: {
          paidTaxAmount,
          finalProfit,
          paidInsuranceFee,
          additionalInsuranceFee,
        },
      });
    }

    updatedTaxParams.forEach((item) => {
      for (var key in item.data) {
        item.data[key] = truncateNum(item.data[key]);
      }
    });

    await removeReportFromAccounted(userId, reportId, session);
    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);
  });
};

export default resetReportService;
