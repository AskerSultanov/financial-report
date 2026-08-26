import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  needToResumeLoading: Joi.boolean().required(),
});

export default schema;
