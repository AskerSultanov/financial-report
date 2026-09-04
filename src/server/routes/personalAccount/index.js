import { Router } from "express";

import resetUserDataController from "./controllers/resetUserData.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/", resetUserDataController);

export default router;
