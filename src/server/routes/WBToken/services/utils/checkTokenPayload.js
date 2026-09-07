import Joi from "joi";

var tokenPayloadSchema = Joi.object({
  acc: Joi.number().integer().required(),
  ent: Joi.number().integer().required(),
  exp: Joi.number().integer().required(),
  for: Joi.string().valid("self").required(),
  id: Joi.string().uuid().required(),
  iid: Joi.number().integer().required(),
  oid: Joi.number().integer().required(),
  s: Joi.number().integer().required(),
  sid: Joi.string().uuid().required(),
  t: Joi.boolean().required(),
  uid: Joi.number().integer().required(),
});

var checkTokenPayload = (tokenPayload) => {
  var { error } = tokenPayloadSchema.validate(tokenPayload);

  return { payloadIsInvalid: error };
};

export default checkTokenPayload;
