import multer from "multer";
import { Router } from "express";
import * as joiSchemas from "./JoiSchemas/index.js";
import fileFilter from "./services/fileFilter/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

import getReport from "./controllers/getReport.js";
import deleteImage from "./controllers/deleteImage.js";
import saveReports from "./controllers/saveReports.js";
import deleteReport from "./controllers/deleteReport.js";
import getReportPage from "./controllers/getReportPage.js";
import skuPhotoUpload from "./controllers/skuPhotoUpload.js";
import setCostPriceToSku from "./controllers/setCostPriceToSku.js";
import deleteReportsTree from "./controllers/deleteReportsTree.js";
import checkReportExists from "./controllers/checkReportExists.js";
import reportLoadDelegate from "./controllers/reportLoadDelegate.js";
import saveReportFromFile from "./controllers/saveReportFromFile.js";
import setCostPriceToSkus from "./controllers/setCostPriceToSkus.js";
import downloadReportAsXLSX from "./controllers/downloadReportAsXLSX.js";
import downloadReportsAsZip from "./controllers/downloadReportsAsZip.js";
import setOtherExpensesToSku from "./controllers/setOtherExpensesToSku.js";
import getReportLoadingState from "./controllers/getReportLoadingState.js";
import checkReportsLoadingProgress from "./controllers/checkReportsLoadingProgress.js";
import resumeAbandonedReportsLoading from "./controllers/resumeAbandonedReportsLoading.js";
import changeFinancialAccountingStatus from "./controllers/changeFinancialAccountingStatus.js";

var maxReportFilesCount = 15;
var needToValidateReqParams = true;

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", getReportPage);
router.get("/:userId/:reportId", joiSchemaValidator(joiSchemas.getReportSchema, needToValidateReqParams), getReport);
router.post("/", joiSchemaValidator(joiSchemas.saveReportsSchema), reportLoadDelegate, checkReportExists, checkReportsLoadingProgress, saveReports);
router.delete("/", joiSchemaValidator(joiSchemas.deleteReportSchema), deleteReport);

router.post("/as-zip/", joiSchemaValidator(joiSchemas.downloadReportsAsZipSchema), downloadReportsAsZip);
router.post("/as-xlsx/", joiSchemaValidator(joiSchemas.downloadReportAsXLSXSchema), downloadReportAsXLSX);

router.get("/loading-state/:userId/", joiSchemaValidator(joiSchemas.getreportLoadingStatechema, needToValidateReqParams), getReportLoadingState);
router.post("/loading-state/abandoned/", joiSchemaValidator(joiSchemas.resumeAbandonedReportsLoadingSchema), resumeAbandonedReportsLoading);
router.post("/files", upload.array("file", maxReportFilesCount), saveReportFromFile);

router.patch("/skus/cost-price", joiSchemaValidator(joiSchemas.setCostPriceToSkuSchema), setCostPriceToSku);
router.patch("/skus/cost-prices", joiSchemaValidator(joiSchemas.setCostPriceToSkusSchema), setCostPriceToSkus);
router.patch("/skus/other-expenses", joiSchemaValidator(joiSchemas.setOtherExpensesToSkuSchema), setOtherExpensesToSku);

router.patch("/financial-accounting-status/", joiSchemaValidator(joiSchemas.changeFinancialAccountingStatusSchema), changeFinancialAccountingStatus);

router.delete("/delete_all_reporting_periods/:userId", deleteReportsTree);

router.post("/image/", upload.single("sku-photo"), skuPhotoUpload);
router.delete("/image/", joiSchemaValidator(joiSchemas.deleteImageSchema), deleteImage);

export default router;
