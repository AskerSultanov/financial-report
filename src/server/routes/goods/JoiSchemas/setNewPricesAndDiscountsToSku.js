import Joi from "joi";

var checkedWeekDaysArraySchema = Joi.array().items(Joi.number().required()).required();
var skuObjectSchema = Joi.object({
  changePriceIfInPromo: Joi.boolean().required(),
  data: { nmID: Joi.number().required(), price: Joi.number().required(), discount: Joi.number().required() },
});

var schema = Joi.object({
  skuId: Joi.number().required(),
  userId: Joi.string().required(),
  skuName: Joi.string().required(),
  skuDataToUpdate: skuObjectSchema,
  setNewPriceNow: Joi.boolean().required(),
  expectedPriceExists: Joi.boolean().required(),
  checkedWeekDays: checkedWeekDaysArraySchema,
});

export default schema;
