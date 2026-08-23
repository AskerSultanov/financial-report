import Joi from "joi";

var skuSchema = Joi.object({
  tax: Joi.number().required(),
  qty: Joi.number().required(),
  profit: Joi.number().required(),
  costPrice: Joi.number().required(),
  finalProfit: Joi.number().required(),
  profitMargin: Joi.number().required(),
  retailAmount: Joi.number().required(),
  insuranceFee: Joi.number().required(),
  preTaxProfit: Joi.number().required(),
  otherExpenses: Joi.number().required(),
  additionalInsuranceFee: Joi.number().required(),
});

var schema = Joi.object({
  year: Joi.number().required(),
  userId: Joi.string().required(),
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  skuName: Joi.string().required(),
  costPrice: Joi.number(),
  isCrossYearPeriod: Joi.boolean().required(),
  otherExpenses: Joi.number(),
  taxRate: Joi.number().required(),
  sku: skuSchema,
});

export default schema;
