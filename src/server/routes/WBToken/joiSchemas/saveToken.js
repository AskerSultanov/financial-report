import Joi from "joi";

var schema = Joi.object({
  token: Joi.string().required(),
  userId: Joi.string().uuid().required(),
});

export default schema;
