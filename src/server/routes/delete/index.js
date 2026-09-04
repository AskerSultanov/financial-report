import { Router } from "express";
import deleteUserController from "./controllers/deleteUser.js";
import deleteUsersController from "./controllers/deleteUsers.js";

var router = Router({ caseSensitive: true, strict: true });

router.delete("/user", deleteUserController);
router.delete("/users", deleteUsersController);

export default router;
