import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  skuName: Joi.string().required(),
});

export default schema;
