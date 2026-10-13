import calcUtils from "../../reports/services/utils/calcUtils/index.js";
import getPrevSkuData from "../../reports/services/utils/different/getPrevSkuData.js";
import calcBaseAndRemainder from "../../reports/services/utils/different/calcBaseAndRemainder.js";

var taxParamsStub = {
  finalProfit: 0,
  retailAmount: 0,
  paidTaxAmount: 0,
  paidInsuranceFee: 0,
  excessInsuranceRate: 1,
  maxInsuranceFee: 300000,
  mandatoryInsuranceFee: 0,
  additionalInsuranceFee: 0,
  isInsuranceFeePaid: false,
  insuranceFeePercentage: 10,
  mandatoryInsuranceFeeRate: 10,
  hasExcessIncomeForInsurance: false,
  mandatoryInsuranceFeeIsPaid: false,
  additionalInsuranceFeeIsPaid: false,
  requiresAdditionalInsuranceFee: false,
  excessIncomeForAdditionalInsuranceFee: 300000,
};

var setExtraAmountsToReportController = async (req, res) => {
  var { updateField, year } = data;

  var skusDataToClient = [];

  if (updateField.value === 0) {
    return { reportNotFound: false, data: {} };
  }

  if (!report) {
    return { reportNotFound: true, data: {} };
  }

  var skusFilteredByYear;

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
      taxParam,
    );

    newFinalProfit += updatedSkuFields.finalProfit;

    var updatedSku = {
      year: sku.year,
      skuName: sku.skuName,
      data: { ...updatedSkuFields, [key]: sku[key] },
    };

    updatedSkus.push(updatedSku);
    skusDataToClient.push(updatedSku);
  }

  var startYear = +report.dateFrom.split("-")[0];
  var endYear = +report.dateTo.split("-")[0];

  return {
    reportNotFound: false,
    data: {
      skusDataToClient,
      requiredYear: year,
      years: [startYear, endYear],
      isCrossYearPeriod: report.isCrossYearPeriod,
    },
  };
};

export default setExtraAmountsToReportController;
