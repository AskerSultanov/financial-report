import multer from "multer";
import { Router } from "express";
import schemas from "./JoiSchemas/index.js";
import setCostPrice from "./controllers/setCostPrice.js";
import getReportPage from "./controllers/getReportPage.js";
import tokenValidator from "./controllers/tokenValidator.js";
import fileFilter from "../reports/services/fileFilter/index.js";
import setOtherExpenses from "./controllers/setOtherExpenses.js";
import getReportFromWBAPI from "./controllers/getReportFromWBAPI.js";
import getReportFromFiles from "./controllers/getReportFromFiles.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import downloadReportAsXLSX from "./controllers/downloadReportAsXLSX.js";
import getDecodeReportWithoutRegistrationPage from "./controllers/getDecodeReportWithoutRegistrationPage.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getDecodeReportWithoutRegistrationPage);

router.get("/report/:id", getReportPage);

router.post("/xlsx/", downloadReportAsXLSX);

router.post("/", joiSchemaValidator(schemas.reportsFromWBAPI), getReportFromWBAPI);

router.patch("/report/cost-price", joiSchemaValidator(schemas.setCostPrice), setCostPrice);

router.patch("/report/other-expenses", joiSchemaValidator(schemas.setCostPrice), setOtherExpenses);

router.post("/token/", tokenValidator);

router.post("/files", upload.array("file"), getReportFromFiles);

export default router;
