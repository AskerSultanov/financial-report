var joiSchemaValidator =
  (schema, needToValidateReqParams = false) =>
  (req, res, next) => {
    var error;

    if (needToValidateReqParams) {
      if (!req.params) {
        return res.sendStatus(400);
      }
      error = schema.validate(req.params).error;
    } else {
      if (!req.body) {
        return res.sendStatus(400);
      }
      error = schema.validate(req.body).error;
    }

    if (error) {
      console.error("JOI_SCHEMA_VALIDATION_ERROR", "\n", error);
      return res.sendStatus(400);
    }

    next();
  };

export default joiSchemaValidator;
