import { Schema } from "mongoose";

var priceAndDiscountSchema = new Schema(
  {
    nmID: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  { _id: false },
);

var skuSchema = new Schema(
  {
    nmID: { type: Number, required: true },
    dayIndex: { type: Number, required: false },
    needToUpdate: { type: Boolean, default: true },
    lastUpdatedTimestamp: { type: Number, default: 0 },
    data: { type: priceAndDiscountSchema, required: false },
    updateInterval: { type: String, default: "5m" },
    changePriceIfInPromo: { type: Boolean, default: false },
    updateIntervalInMs: { type: Number, default: 300000 },
    updateOption: { type: String, default: "interval", enum: ["interval", "oncePerDay"] },
  },
  { _id: false },
);

var weeklyPricesAndDiscountsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  uploadId: { type: Number, required: false },
  weeklyPricesAndDiscounts: [{ type: [skuSchema], required: false }],
});

export default weeklyPricesAndDiscountsSchema;
