import Joi from "joi";

var dataObjectSchema = Joi.object({
  taxRate: Joi.number(),
  mandatoryInsuranceFeeRate: Joi.number(),
  mandatoryInsuranceFee: Joi.number(),
});

var schema = Joi.object({
  data: dataObjectSchema,
  year: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  reportsNeedRecalculation: Joi.boolean().required(),
});

export default schema;
