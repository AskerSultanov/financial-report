import { Router } from "express";
import logoutController from "./controllers/logout.js";
import getMainPageController from "./controllers/getMainPage.js";
import getMainPageDataController from "./controllers/getMainPageData.js";

import * as joiSchemas from "./joiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getMainPageController);
router.post("/logout", logoutController);
router.get(
  "/api/:userId",
  joiSchemaValidator(joiSchemas.getMainPageDataSchema, needToValidateReqParams),
  getMainPageDataController,
);

export default router;
