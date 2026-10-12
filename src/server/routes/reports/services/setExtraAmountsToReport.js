import calcUtils from "./utils/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import truncateNum from "./utils/reportParsing/truncateNum.js";
import calcBaseAndRemainder from "./utils/different/calcBaseAndRemainder.js";

var { getReportById, saveUpdatedReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setExtraAmountsToReportService = async (data) => {
  var { userId, reportId, updateField, year } = data;

  var skusDataToClient = [];

  if (updateField.value === 0) {
    return { reportNotFound: false, data: {} };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { report } = await getReportById(userId, reportId, session);

    if (!report) {
      return { reportNotFound: true, data: {} };
    }

    var skusFilteredByYear;
    var taxParam = await getTaxParamsFromDb(userId, year, session);

    if (report.isCrossYearPeriod) {
      skusFilteredByYear = report.skus.filter((sku) => sku.year === year);
    } else {
      skusFilteredByYear = report.skus;
    }

    var { baseCents, remainderCents } = calcBaseAndRemainder(
      updateField.value,
      skusFilteredByYear.length,
    );

    var { key } = updateField;
    var step = remainderCents >= 0 ? 1 : -1;
    var remainderAbs = Math.abs(remainderCents);

    var updatedSkus = [];
    var prevAmount = skusFilteredByYear.reduce((a, i) => a + i[key], 0);
    var prevFinalProfit = skusFilteredByYear.reduce(
      (a, i) => a + i.finalProfit,
      0,
    );

    var newFinalProfit = 0;

    for (var i = 0; i < skusFilteredByYear.length; i++) {
      var extraCents = i < remainderAbs ? step : 0;
      var cents = baseCents + extraCents;

      var sku = skusFilteredByYear[i];
      sku[key] = cents / 100;

      var recalculatedFinalProfit = sku.finalProfit + sku[key];
      sku.finalProfit = truncateNum(recalculatedFinalProfit);
      newFinalProfit += sku.finalProfit;

      var updatedSku = { finalProfit: sku.finalProfit, [key]: sku[key] };

      updatedSkus.push({ skuName: sku.skuName, data: updatedSku });

      skusDataToClient.push({
        year,
        skuName: sku.skuName,
        data: updatedSku,
      });
    }

    var recalculatedFinalProfit =
      taxParam.finalProfit - prevFinalProfit + newFinalProfit;

    var recalculatedAmount = 0;

    switch (key) {
      case "tax":
        key = "paidTaxAmount";
        recalculatedAmount =
          taxParam.paidTaxAmount - prevAmount + updateField.value;

        break;

      case "insuranceFee":
        key = "paidInsuranceFee";

        recalculatedAmount =
          taxParam.paidInsuranceFee - prevAmount + updateField.value;
        break;

      case "additionalInsuranceFee":
        key = "additionalInsuranceFee";

        recalculatedAmount =
          taxParam.additionalInsuranceFee - prevAmount + updateField.value;
        break;
    }

    var updatedTaxParams = [
      {
        year,
        data: {
          [key]: truncateNum(recalculatedAmount),
          finalProfit: truncateNum(recalculatedFinalProfit),
        },
      },
    ];

    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);

    return {
      reportNotFound: false,
      data: {
        skusDataToClient,
        years: [year],
        isCrossYearPeriod: report.isCrossYearPeriod,
      },
    };
  });
};

export default setExtraAmountsToReportService;
