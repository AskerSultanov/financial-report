import multer from "multer";
import { Router } from "express";
import * as joiSchemas from "./JoiSchemas/index.js";
import fileFilter from "./services/fileFilter/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

import getReportController from "./controllers/getReport.js";
import deleteImageController from "./controllers/deleteImage.js";
import saveReportsController from "./controllers/saveReports.js";
import deleteReportController from "./controllers/deleteReport.js";
import getReportPageController from "./controllers/getReportPage.js";
import skuPhotoUploadController from "./controllers/skuPhotoUpload.js";
import setCostPriceToSkuController from "./controllers/setCostPriceToSku.js";
import checkReportExistsController from "./controllers/checkReportExists.js";
import reportLoadDelegateController from "./controllers/reportLoadDelegate.js";
import saveReportFromFileController from "./controllers/saveReportFromFile.js";
import setCostPriceToSkusController from "./controllers/setCostPriceToSkus.js";
import downloadReportAsXLSXController from "./controllers/downloadReportAsXLSX.js";
import downloadReportsAsZipController from "./controllers/downloadReportsAsZip.js";
import setOtherExpensesToSkuController from "./controllers/setOtherExpensesToSku.js";
import getReportLoadingStateController from "./controllers/getReportLoadingState.js";
import checkReportsLoadingProgressController from "./controllers/checkReportsLoadingProgress.js";
import resumeAbandonedReportsLoadingController from "./controllers/resumeAbandonedReportsLoading.js";
import changeFinancialAccountingStatusController from "./controllers/changeFinancialAccountingStatus.js";

import checkTokenExists from "../WBToken/controllers/checkTokenExists.js";

var maxReportFilesCount = 15;
var needToValidateReqParams = true;

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

export default router;

router.get("/:id", getReportPageController);

router.get(
  "/:userId/:reportId",
  joiSchemaValidator(joiSchemas.getReportSchema, needToValidateReqParams),
  getReportController,
);

router.post(
  "/",
  joiSchemaValidator(joiSchemas.saveReportsSchema),
  checkTokenExists,
  reportLoadDelegateController,
  checkReportExistsController,
  checkReportsLoadingProgressController,
  saveReportsController,
);

router.delete(
  "/",
  joiSchemaValidator(joiSchemas.deleteReportSchema),
  deleteReportController,
);

router.post(
  "/as-zip/",
  joiSchemaValidator(joiSchemas.downloadReportsAsZipSchema),
  downloadReportsAsZipController,
);

router.post(
  "/as-xlsx/",
  joiSchemaValidator(joiSchemas.downloadReportAsXLSXSchema),
  downloadReportAsXLSXController,
);

router.get(
  "/loading-state/:userId/",
  joiSchemaValidator(
    joiSchemas.getreportLoadingStatechema,
    needToValidateReqParams,
  ),
  getReportLoadingStateController,
);

router.post(
  "/loading-state/abandoned/",
  joiSchemaValidator(joiSchemas.resumeAbandonedReportsLoadingSchema),
  resumeAbandonedReportsLoadingController,
);

router.post(
  "/files",
  upload.array("file", maxReportFilesCount),
  saveReportFromFileController,
);

router.patch(
  "/skus/cost-price",
  joiSchemaValidator(joiSchemas.setCostPriceToSkuSchema),
  setCostPriceToSkuController,
);

router.patch(
  "/skus/cost-prices",
  joiSchemaValidator(joiSchemas.setCostPriceToSkusSchema),
  setCostPriceToSkusController,
);

router.patch(
  "/skus/other-expenses",
  joiSchemaValidator(joiSchemas.setOtherExpensesToSkuSchema),
  setOtherExpensesToSkuController,
);

router.patch(
  "/financial-accounting-status/",
  joiSchemaValidator(joiSchemas.changeFinancialAccountingStatusSchema),
  changeFinancialAccountingStatusController,
);

router.post("/image/", upload.single("sku-photo"), skuPhotoUploadController);

router.delete(
  "/image/",
  joiSchemaValidator(joiSchemas.deleteImageSchema),
  deleteImageController,
);
