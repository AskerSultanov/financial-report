import calc from "../../reports/services/calcServices/index.js";
import getPrevSkuData from "../../reports/services/different/getPrevSkuData.js";

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

var setOtherExpensesToSkuController = async (req, res, next) => {
  var { dateFrom, dateTo, userId, skuName, sku, taxRate, year, isCrossYearPeriod } = req.body;

  if (sku.otherExpenses === req.body.otherExpenses) {
    return res.sendStatus(409);
  }

  var years = [];

  if (isCrossYearPeriod) {
    var startYear = +dateFrom.split("-")[0];
    var endYear = +dateTo.split("-")[0];
    var requiredYear = year === startYear ? startYear : endYear;
    years = [requiredYear];
  }

  var prevSkuData = getPrevSkuData(sku);

  sku.otherExpenses = req.body.otherExpenses;

  var { updatedSkuFields } = calc.sku.restParams(sku, prevSkuData, { taxRate, ...taxParamsStub }, prevSkuData);

  return res.json({
    userId,
    years,
    isCrossYearPeriod,
    sku: {
      year,
      skuName,
      data: updatedSkuFields,
    },
  });
};

export default setOtherExpensesToSkuController;
