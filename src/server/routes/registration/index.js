import { Router } from "express";
import createUserController from "./controller/createUser.js";
import getRegistrationFormPageController from "./controller/getRegistrationFormPage.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getRegistrationFormPageController);

router.post("/new", createUserController);

export default router;
