import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  newStatus: Joi.boolean().required(),
});

export default schema;
