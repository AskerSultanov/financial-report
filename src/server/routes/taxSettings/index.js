import { Router } from "express";
import * as joiSchemas from "./joiSchemas/index.js";
import getTaxSettingsPage from "./controllers/getTaxSettingsPage.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import updateTaxSettingsController from "./controllers/updateTaxSettings.js";
import getTaxSettingsController from "./controllers/getTaxSettingsController.js";

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getTaxSettingsPage);

router.get(
  "/api/:userId",
  joiSchemaValidator(joiSchemas.getTaxSettingsSchema, needToValidateReqParams),
  getTaxSettingsController,
);

router.post(
  "/",
  joiSchemaValidator(joiSchemas.updateTaxSettingsSchema),
  updateTaxSettingsController,
);

export default router;
