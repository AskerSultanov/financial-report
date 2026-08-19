import { Schema } from "mongoose";

var mskTimeOffsetInMs = 10_800_000;

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
  },
  { _id: false },
);

var goodsSchema = new Schema({
  userId: { type: String, required: true },
  listGoods: [{ type: skuSchema, required: true }],
});

export default goodsSchema;
