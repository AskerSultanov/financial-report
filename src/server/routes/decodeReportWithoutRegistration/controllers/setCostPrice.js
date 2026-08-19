import Joi from "joi";
import calc from "../../reports/services/calcServices/index.js";
import getPrevSkuData from "../../reports/services/different/getPrevSkuData.js";
import getPrevTotalsData from "../../reports/services/different/getPrevTotalsData.js";
import excludeEqualParams from "../../reports/services/different/excludeEqualParams.js";
import processOfSkuCostPriceSetting from "../../reports/services/different/processOfSkuCostPriceSetting.js";

var skuFromListGoodsStub = [];
var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

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

var setCostPrice = async (req, res, next) => {
  var { dateFrom, dateTo, userId, reportId, skuIndex, sku, totals, taxRate, year } = req.body;

  var { isCrossYearPeriod } = totals;

  var years = [];
  var postfix = "";
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];

  if (isCrossYearPeriod) {
    years = [startYear, endYear];
    postfix = year === startYear ? currentYearPostfix : endYearPostfix;
  }

  var costPriceKey = "costPrice" + postfix;

  if (sku[costPriceKey] === req.body[costPriceKey]) {
    return res.sendStatus(409);
  }

  var prevSkuData = getPrevSkuData(sku);
  var prevReportTotals = getPrevTotalsData(totals);

  sku[costPriceKey] = req.body[costPriceKey];

  var { updatedSkuFields } = processOfSkuCostPriceSetting(sku, { taxRate, ...taxParamsStub }, prevSkuData, postfix);
  var { updatedTotals } = calc.total.restParams(totals, prevSkuData, updatedSkuFields, isCrossYearPeriod, postfix);

  var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);
  var totalsDataToClient = excludeEqualParams(prevReportTotals, updatedTotals);

  skuDataToClient[costPriceKey] = req.body[costPriceKey];

  return res.json({
    userId,
    years,
    sku: {
      year,
      skuIndex,
      data: skuDataToClient,
    },
    totals: { data: totalsDataToClient },
  });
};

export default setCostPrice;
