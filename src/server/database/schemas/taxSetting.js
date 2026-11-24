import { Schema } from "mongoose";

var taxSettingSchema = new Schema({
  userId: { type: String, required: true },
  year: { type: Number, required: true },
  taxRate: { type: Number, default: 6 },
  paidTaxAmount: { type: Number, default: 0 },
  mandatoryInsuranceFee: { type: Number, default: 0 },
  insuranceFeePercentage: { type: Number, default: 10 },
  paidInsuranceFee: { type: Number, default: 0 },
  retailAmount: { type: Number, default: 0 },
  otherExpenses: { type: Number, default: 0 },
  taxableAmount: { type: Number, default: 0 },
  finalProfit: { type: Number, default: 0 },
  isInsuranceFeePaid: { type: Boolean, default: false },
  additionalInsuranceFee: { type: Number, default: 0 },
  requiresAdditionalInsuranceFee: { type: Boolean, default: false },
  excessIncomeForAdditionalInsuranceFee: { type: Number },
  maxInsuranceFee: { type: Number },
  mandatoryInsuranceFeeRate: { type: Number, default: 10 },
  hasExcessIncomeForInsurance: { type: Boolean, default: false },
  mandatoryInsuranceFeeIsPaid: { type: Boolean, default: false },
  additionalInsuranceFeeIsPaid: { type: Boolean, default: false },
  excessInsuranceRate: { type: Number, default: 1 },
});

taxSettingSchema.index({ userId: 1, year: 1 }, { unique: true });

export default taxSettingSchema;
