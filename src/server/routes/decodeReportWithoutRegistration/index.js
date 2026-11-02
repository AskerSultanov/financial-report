import { Router } from "express";
import getDecodeReportWithoutRegistrationPageController from "./controllers/getDecodeReportWithoutRegistrationPage.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getDecodeReportWithoutRegistrationPageController);

export default router;
