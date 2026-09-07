import Joi from "joi";

var skuDataToUpdateSchema = Joi.object({
  changePriceIfInPromo: Joi.boolean().required(),
});
var checkedWeekDaysArraySchema = Joi.array()
  .items(Joi.number().required())
  .min(1)
  .max(1)
  .required();

var schema = Joi.object({
  skuId: Joi.number().required(),
  userId: Joi.string().uuid().required(),
  skuDataToUpdate: skuDataToUpdateSchema,
  checkedWeekDays: checkedWeekDaysArraySchema,
});

export default schema;
