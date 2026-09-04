import { Router } from "express";
import * as joiSchemas from "./joiSchemas/index.js";
import getTaxParamsController from "./controllers/getTaxParams.js";
import updateTaxParamsController from "./controllers/updateTaxParams.js";
import getTaxParamsPageController from "./controllers/getTaxParamsPage.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getTaxParamsPageController);

router.get("/api/:userId", joiSchemaValidator(joiSchemas.getTaxParamsSchema, needToValidateReqParams), getTaxParamsController);

router.post("/", joiSchemaValidator(joiSchemas.changeTaxParamsSchema), updateTaxParamsController);

export default router;
