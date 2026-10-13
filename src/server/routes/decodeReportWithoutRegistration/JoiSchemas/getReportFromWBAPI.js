import Joi from "joi";

var schema = Joi.object({
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  token: Joi.string().required(),
});

export default schema;
