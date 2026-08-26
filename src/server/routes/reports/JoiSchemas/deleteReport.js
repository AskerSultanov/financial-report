import Joi from "joi";

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required() });

export default schema;
