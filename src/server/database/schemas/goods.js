import { Schema } from "mongoose";

var mskTimeOffsetInMs = 10_800_000;

var skuMetrictSchema = new Schema(
  {
    year: { type: Number, required: true },
    qty: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    fines: { type: Number, required: true, default: 0 },
    netProfit: { type: Number, required: true, default: 0 },
    profitMargin: { type: Number, required: true, default: 0 },
    retailAmount: { type: Number, required: true, default: 0 },
    taxableAmount: { type: Number, required: true, default: 0 },
    returnAmount: { type: Number, required: true, default: 0 },
    storageCost: { type: Number, required: true, default: 0 },
    deliveryCost: { type: Number, required: true, default: 0 },
    acceptance: { type: Number, required: true, default: 0 },
    insuranceFee: { type: Number, required: true, default: 0 },
    otherExpenses: { type: Number, required: true, default: 0 },
    sellerPayoutAmount: { type: Number, required: true, default: 0 },
    deductionOrPayment: { type: Number, required: true, default: 0 },
    additionalInsuranceFee: { type: Number, required: true, default: 0 },
  },
  { _id: false },
);

var skuSchema = new Schema(
  {
    id: { type: Number, required: true },
    skuName: { type: String, required: true },
    price: { type: Number, required: false },
    discount: { type: Number, required: false },
    discountedPrice: { type: Number, required: false },
    clubDiscountedPrice: { type: Number, required: false },
    disabled: { type: Boolean, default: false },
    lastFetch: { type: Date, default: () => Date.now() + mskTimeOffsetInMs },
    lastUpdated: { type: Date, required: false },
    lastCostPrice: { type: Number, required: false },
    isPriceUpdated: { type: Boolean, required: false },
    errorText: { type: String, requred: false },
    deleted: { type: Boolean, default: false },
    metrics: [{ type: skuMetrictSchema, required: false, default: [] }],
  },
  { _id: false },
);

var goodsSchema = new Schema({
  userId: { type: String, required: true },
  listGoods: [{ type: skuSchema, required: true }],
});

export default goodsSchema;
