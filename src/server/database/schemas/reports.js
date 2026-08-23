import { Schema } from "mongoose";

var booleanOptions = { type: Boolean };
var numberOptions = { type: Number, default: 0 };
var stringOptions = { type: String, required: true };
var nonRequiredNumberOptions = { type: Number, required: false };

var skuSchema = new Schema(
  {
    skuName: stringOptions,
    qty: numberOptions,
    taxableAmount: numberOptions,
    costPrice: numberOptions,
    otherExpenses: numberOptions,
    revenue: numberOptions,
    sellerPayoutAmount: numberOptions,
    fines: numberOptions,
    returnAmount: numberOptions,
    retailAmount: numberOptions,
    deliveryCost: numberOptions,
    storageCost: numberOptions,
    acceptance: numberOptions,
    deductionOrPayment: numberOptions,
    additionalPayment: numberOptions,
    tax: numberOptions,
    insuranceFee: numberOptions,
    additionalInsuranceFee: numberOptions,
    profit: numberOptions,
    preTaxProfit: numberOptions,
    finalProfit: numberOptions,
    profitMargin: numberOptions,
    isCostPriceSet: { type: Boolean, default: false },
    year: { type: Number, required: true },
    isInsuranceFeeIncluded: booleanOptions,
    averageProfit: numberOptions,
    averageRetailPrice: numberOptions,
    averageStorageCost: numberOptions,
    averageAdvertisingCost: numberOptions,
    id: { type: Number, required: true },
  },
  { _id: false },
);
var recordedToSchema = new Schema({ year: { type: Number, required: true }, month: stringOptions }, { _id: false });

var reportSchema = new Schema(
  {
    userId: stringOptions,
    reportId: numberOptions,
    dateFrom: stringOptions,
    dateTo: stringOptions,
    taxRate: { type: Number, default: 6 },
    isCrossYearPeriod: { type: Boolean, default: false },
    recordedTo: { type: recordedToSchema, requred: true },
    buybackReportIsExist: { type: Boolean, default: false },
    isFinancesAccounted: { type: Boolean, default: false },
    reportIsEmpty: { type: Boolean, default: false },
    skus: [{ type: skuSchema, required: true }],
  },
  { _id: false },
);

var reportsWithAccountedFinancesSchema = new Schema(
  {
    userId: stringOptions,
    dateFrom: stringOptions,
    dateTo: stringOptions,
    reportId: { type: Number, required: true },
    tax: { type: Number, required: true, default: 0 },
    financesAccountedAt: { type: Date, required: true },
    profit: { type: Number, required: true, default: 0 },
    margin: { type: Number, required: true, default: 0 },
    productCosts: { type: Number, required: true, default: 0 },
    insuranceFee: { type: Number, required: true, default: 0 },
    additionalInsuranceFee: { type: Number, required: true, default: 0 },
  },
  { _id: false },
);

var reportsSchema = new Schema({
  userId: stringOptions,
  reports: { type: [reportSchema], required: false },
  reportsWithAccountedFinances: { type: [reportsWithAccountedFinancesSchema], required: false },
});

export default reportsSchema;
