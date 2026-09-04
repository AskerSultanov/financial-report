import Joi from "joi";

var schema = Joi.object({ userId: Joi.string().required() });

export default schema;
