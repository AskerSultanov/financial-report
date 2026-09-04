import multer from "multer";
import { Router } from "express";
import schemas from "./JoiSchemas/index.js";
import setCostPriceController from "./controllers/setCostPrice.js";
import getReportPageController from "./controllers/getReportPage.js";
import tokenValidatorController from "./controllers/tokenValidator.js";
import fileFilter from "../reports/services/fileFilter/index.js";
import setOtherExpensesController from "./controllers/setOtherExpenses.js";
import getReportFromWBAPIController from "./controllers/getReportFromWBAPI.js";
import getReportFromFilesController from "./controllers/getReportFromFiles.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import downloadReportAsXLSXController from "./controllers/downloadReportAsXLSX.js";
import getDecodeReportWithoutRegistrationPageController from "./controllers/getDecodeReportWithoutRegistrationPage.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getDecodeReportWithoutRegistrationPageController);

router.get("/report/:id", getReportPageController);

router.post("/xlsx/", downloadReportAsXLSXController);

router.post("/", joiSchemaValidator(schemas.reportsFromWBAPI), getReportFromWBAPIController);

router.patch("/report/cost-price", joiSchemaValidator(schemas.setCostPrice), setCostPriceController);

router.patch("/report/other-expenses", joiSchemaValidator(schemas.setCostPrice), setOtherExpensesController);

router.post("/token/", tokenValidatorController);

router.post("/files", upload.array("file"), getReportFromFilesController);

export default router;
