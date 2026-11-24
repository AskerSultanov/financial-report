import Joi from "joi";

var schema = Joi.object({ userId: Joi.string().uuid().required() });
export default schema;
