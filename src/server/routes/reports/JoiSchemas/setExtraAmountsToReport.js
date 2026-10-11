import Joi from "joi";

var schema = Joi.object({
  year: Joi.number(),
  reportId: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  isCrossYearPeriod: Joi.boolean().required(),
  data: {
    key: Joi.string()
      .valid("taxAmount", "insuranceFee", "additionalInsuranceFee")
      .required(),
    value: Joi.number().required(),
  },
});

export default schema;
