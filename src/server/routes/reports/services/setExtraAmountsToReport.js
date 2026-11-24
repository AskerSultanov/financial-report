import calcUtils from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import truncateNum from "./utils/reportParsing/truncateNum.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import calcBaseAndRemainder from "./utils/different/calcBaseAndRemainder.js";

var { getSkusFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var setExtraAmountsToReportService = async (data) => {
  var {
    year,
    dateTo,
    userId,
    reportId,
    dateFrom,
    updateField,
    isCrossYearPeriod,
  } = data;

  var skusDataToClient = [];

  if (updateField.value === 0) {
    return { reportNotFound: false, data: {} };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { skusFromReport } = await getSkusFromReport(
      userId,
      reportId,
      [],
      year,
      session,
    );

    if (!skusFromReport.length) {
      return { reportNotFound: true, data: {} };
    }

    var skusFilteredByYear;
    var { taxSetting } = await getTaxSettingByYear(userId, year, session);

    if (isCrossYearPeriod) {
      skusFilteredByYear = skusFromReport.filter((sku) => sku.year === year);
    } else {
      skusFilteredByYear = skusFromReport;
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
      var prevSkuData = getPrevSkuData(sku);

      sku[key] = cents / 100;

      var { updatedSkuFields } = calcUtils.sku.restParams(
        sku,
        prevSkuData,
        taxSetting,
      );

      newFinalProfit += updatedSkuFields.finalProfit;

      var updatedSku = {
        year,
        reportId,
        skuName: sku.skuName,
        data: { ...updatedSkuFields, [key]: sku[key] },
      };

      updatedSkus.push(updatedSku);
      skusDataToClient.push(updatedSku);
    }

    var recalculatedFinalProfit =
      taxSetting.finalProfit - prevFinalProfit + newFinalProfit;

    var recalculatedAmount = 0;

    switch (key) {
      case "tax":
        key = "paidTaxAmount";
        recalculatedAmount =
          taxSetting.paidTaxAmount - prevAmount + updateField.value;

        break;

      case "insuranceFee":
        key = "paidInsuranceFee";

        recalculatedAmount =
          taxSetting.paidInsuranceFee - prevAmount + updateField.value;
        break;

      case "additionalInsuranceFee":
        key = "additionalInsuranceFee";

        recalculatedAmount =
          taxSetting.additionalInsuranceFee - prevAmount + updateField.value;
        break;
    }

    var updatedTaxSettings = [
      {
        year,
        data: {
          [key]: truncateNum(recalculatedAmount),
          finalProfit: truncateNum(recalculatedFinalProfit),
        },
      },
    ];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);

    var startYear = +dateFrom.split("-")[0];
    var endYear = +dateTo.split("-")[0];

    return {
      reportNotFound: false,
      data: {
        skusDataToClient,
        requiredYear: year,
        years: [startYear, endYear],
      },
    };
  });
};

export default setExtraAmountsToReportService;
