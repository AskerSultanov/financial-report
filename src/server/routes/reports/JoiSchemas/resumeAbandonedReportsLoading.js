import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  needToResumeLoading: Joi.boolean().required(),
});

export default schema;
