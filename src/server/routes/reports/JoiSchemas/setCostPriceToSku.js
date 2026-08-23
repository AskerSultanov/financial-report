import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  year: Joi.number().required(),
  skuName: Joi.string().required(),
  costPrice: Joi.number(),
  otherExpenses: Joi.number(),
});

export default schema;
