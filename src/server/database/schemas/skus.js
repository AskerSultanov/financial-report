import { Schema } from "mongoose";
import basicReportDataSchema from "./basicReportData.js";

var skuSchema = new Schema(
  {
    userId: { type: String, required: true },
    reportId: { type: Number, required: true },

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
    averageStorageCost: { type: Number, required: true, default: 0 },
    averageAdvertisingCost: { type: Number, required: true, default: 0 },
  },
  { autoIndex: false },
);

skuSchema.index({ userId: 1 });
skuSchema.index({ reportId: 1 });
skuSchema.index(
  { userId: 1, reportId: 1, skuName: 1, year: 1 },
  { unique: true },
);

basicReportDataSchema.pre("deleteOne", async (next) => {
  await skuS
});

export default skuSchema;
