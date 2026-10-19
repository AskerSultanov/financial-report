import Joi from "joi";

var validKeys = ["tax", "insuranceFee", "additionalInsuranceFee"];

var schema = Joi.object({
  year: Joi.number().required(),
  reportId: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  updateField: {
    key: Joi.string()
      .valid(...validKeys)
      .required(),
    value: Joi.number().required(),
  },
});

export default schema;
