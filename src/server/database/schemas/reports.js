import { Schema } from "mongoose";

var skuSchema = new Schema(
  {
    id: { type: Number, required: true },
    skuName: { type: String, required: true },
    qty: { type: Number, required: true, default: 0 },
    taxableAmount: { type: Number, required: true, default: 0 },
    costPrice: { type: Number, required: true, default: 0 },
    otherExpenses: { type: Number, required: true, default: 0 },
    revenue: { type: Number, required: true, default: 0 },
    sellerPayoutAmount: { type: Number, required: true, default: 0 },
    fines: { type: Number, required: true, default: 0 },
    returnAmount: { type: Number, required: true, default: 0 },
    retailAmount: { type: Number, required: true, default: 0 },
    deliveryCost: { type: Number, required: true, default: 0 },
    storageCost: { type: Number, required: true, default: 0 },
    acceptance: { type: Number, required: true, default: 0 },
    deductionOrPayment: { type: Number, required: true, default: 0 },
    additionalPayment: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    insuranceFee: { type: Number, required: true, default: 0 },
    additionalInsuranceFee: { type: Number, required: true, default: 0 },
    profit: { type: Number, required: true, default: 0 },
    preTaxProfit: { type: Number, required: true, default: 0 },
    finalProfit: { type: Number, required: true, default: 0 },
    profitMargin: { type: Number, required: true, default: 0 },
    isCostPriceSet: { type: Boolean, default: false },
    year: { type: Number, required: true },
    isInsuranceFeeIncluded: { type: Boolean, required: true, default: false },
    averageProfit: { type: Number, required: true, default: 0 },
    averageRetailPrice: { type: Number, required: true, default: 0 },
    averageStorageCost: { type: Number, required: true, default: 0 },
    averageAdvertisingCost: { type: Number, required: true, default: 0 },
  },
  { _id: false },
);
var recordedToSchema = new Schema({ year: { type: Number, required: true }, month: { type: String, required: true } }, { _id: false });

var reportSchema = new Schema(
  {
    userId: { type: String, required: true },
    reportId: { type: Number, required: true, unique: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
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
    userId: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
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
  userId: { type: String, required: true, unique: true },
  reports: { type: [reportSchema], required: false },
  reportsWithAccountedFinances: { type: [reportsWithAccountedFinancesSchema], required: false },
});

reportsSchema.index({ userId: 1, "reports.reportId": 1 }, { unique: true });

export default reportsSchema;
