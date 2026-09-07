import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  reportIds: Joi.array().items(Joi.number()).required(),
});

export default schema;
