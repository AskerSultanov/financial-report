import { Router } from "express";
import deleteUserController from "./controllers/deleteUser.js";
import resetUserDataController from "./controllers/resetUserData.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/", resetUserDataController);
router.delete("/", deleteUserController);

export default router;
