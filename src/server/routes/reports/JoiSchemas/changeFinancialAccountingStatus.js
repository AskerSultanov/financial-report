import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  reportId: Joi.number().required(),
  newStatus: Joi.boolean().required(),
});

export default schema;
