import { Router } from "express";
import { resetUserSchema } from "./joiSchemas/index.js";
import deleteUserController from "./controllers/deleteUser.js";
import resetUserDataController from "./controllers/resetUserData.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/", joiSchemaValidator(resetUserSchema), resetUserDataController);

router.delete("/", deleteUserController);

export default router;
