import Joi from "joi";
import calc from "../../reports/services/calcServices/index.js";
import getPrevSkuData from "../../reports/services/different/getPrevSkuData.js";
import excludeEqualParams from "../../reports/services/different/excludeEqualParams.js";

var skuFromListGoodsStub = [];

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
var setOtherExpensesToSku = async (req, res, next) => {
  var { dateFrom, dateTo, userId, reportId, skuIndex, sku, totals, taxRate, year } = req.body;

  var { isCrossYearPeriod } = totals;

  var years = [];

  if (sku.otherExpenses === req.body.otherExpenses) {
    return res.sendStatus(409);
  }

  var prevSkuData = getPrevSkuData(sku);

  sku.otherExpenses = req.body.otherExpenses;

  var { updatedSkuFields } = calc.sku.restParams(sku, prevSkuData, { taxRate, ...taxParamsStub }, prevSkuData);

  var skuDataToClient = excludeEqualParams(prevSkuData, updatedSku);

  return res.json({
    userId,
    years,
    sku: {
      year,
      skuIndex,
      data: skuDataToClient,
    },
  });
};

export default setOtherExpensesToSku;
