import { Router } from "express";
import * as joiSchemas from "./joiSchemas/index.js";
import getTaxParams from "./controllers/getTaxParams.js";
import changeTaxParams from "./controllers/changeTaxParams.js";
import getTaxParamsPage from "./controllers/getTaxParamsPage.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getTaxParamsPage);

router.get("/api/:userId", joiSchemaValidator(joiSchemas.getTaxParamsSchema, needToValidateReqParams), getTaxParams);

router.post("/", joiSchemaValidator(joiSchemas.changeTaxParamsSchema), changeTaxParams);

export default router;
