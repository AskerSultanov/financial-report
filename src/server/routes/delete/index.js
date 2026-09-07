import { Router } from "express";
import deleteUsersController from "./controllers/deleteUsers.js";

var router = Router({ caseSensitive: true, strict: true });


router.delete("/users", deleteUsersController);

export default router;
