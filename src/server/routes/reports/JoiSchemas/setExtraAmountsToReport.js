import Joi from "joi";

var validKeys = ["tax", "insuranceFee", "additionalInsuranceFee"];
var updateFieldSchema = {
  key: Joi.string()
    .valid(...validKeys)
    .required(),
  value: Joi.number().required(),
};

var schema = Joi.object({
  year: Joi.number().required(),
  reportId: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  updateField: updateFieldSchema,
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  isCrossYearPeriod: Joi.boolean().required(),
});

export default schema;
