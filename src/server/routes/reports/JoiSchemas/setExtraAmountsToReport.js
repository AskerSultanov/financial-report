import Joi from "joi";

var schema = Joi.object({
  year: Joi.number().required(),
  reportId: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  updateField: {
    key: Joi.string()
      .valid("tax", "insuranceFee", "additionalInsuranceFee")
      .required(),
    value: Joi.number().required(),
  },
});

export default schema;
