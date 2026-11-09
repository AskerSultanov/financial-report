import Joi from "joi";

var skuToUpdateSchema = Joi.object({
  year: Joi.number().required(),
  skuName: Joi.string().required(),
});

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  reportId: Joi.number().required(),
  newValue: Joi.number().required(),
  updateField: Joi.string().valid("costPrice", "otherExpenses").required(),
  skusToUpdate: Joi.array().items(skuToUpdateSchema).required(),
});

export default schema;
