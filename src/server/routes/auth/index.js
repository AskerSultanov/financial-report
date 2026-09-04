import { Router } from "express";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import getAuthFormPageController from "./controllers/getAuthFormPage.js";
import checkUserCredentialsController from "./controllers/checkUserCredentials.js";

import schemas from "./JoiSchemas/index.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAuthFormPageController);

router.post("/", joiSchemaValidator(schemas.checkUserCredentials), checkUserCredentialsController);

export default router;
