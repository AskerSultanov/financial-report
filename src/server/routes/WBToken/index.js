import { Router } from "express";
import schema from "./joiSchemas/index.js";
import saveTokenController from "./controllers/saveToken.js";
import removeTokenController from "./controllers/removeToken.js";
import getTokenDataController from "./controllers/getTokenData.js";
import tokenValidatorController from "./controllers/tokenValidator.js";
import getWbTokenPageController from "./controllers/getWbTokenPage.js";
import checkTokenExistsController from "./controllers/checkTokenExists.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import checkForStoppedReportLoadingController from "./controllers/checkForStoppedReportLoading.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getWbTokenPageController);
router.get("/:userId", getTokenDataController);
router.post("/", joiSchemaValidator(schema.saveToken), tokenValidatorController, saveTokenController, checkForStoppedReportLoadingController);
router.get("/check-exist/:userId", checkTokenExistsController);
router.delete("/", joiSchemaValidator(schema.removeToken), removeTokenController);

export default router;
