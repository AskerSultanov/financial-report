import multer from "multer";
import { Router } from "express";
import fileFilter from "./services/fileFilter/index.js";
import getListGoodsController from "./controllers/getListGoods.js";
import loadListGoodsController from "./controllers/loadListGoods.js";
import getListGoodsPageController from "./controllers/getListGoodsPage.js";
import getSkusMetricsFileController from "./controllers/getSkusMetricsFile.js";
import getWeeklyPricesFileController from "./controllers/getWeeklyPricesFile.js";
import changeSkuDisableStatusController from "./controllers/changeSkuDisableStatus.js";
import getListGoodsAndWeeklyPricesController from "./controllers/getListGoodsAndWeeklyPrices.js";
import uploadPricesAndDiscountsFileController from "./controllers/uploadPricesAndDiscountsFile.js";
import changeWeeklyPricesOrDiscountsController from "./controllers/changeWeeklyPricesOrDiscounts.js";
import setNewPricesAndDiscountsToSkuController from "./controllers/setNewPricesAndDiscountsToSku.js";
import changeStatusOfParticipationInPromoController from "./controllers/changeStatusOfParticipationInPromo.js";

import schemas from "./JoiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getListGoodsPageController);
router.get("/listgoodsonly/:userId", joiSchemaValidator(schemas.getlistGoods, needToValidateReqParams), getListGoodsController);
router.get("/metrics/download/:userId", joiSchemaValidator(schemas.getSkusMetricsFile, needToValidateReqParams), getSkusMetricsFileController);
router.get("/api/:userId", joiSchemaValidator(schemas.getListGoodsAndWeeklyPrices, needToValidateReqParams), getListGoodsAndWeeklyPricesController);
router.get("/prices-discounts/file/:userId", joiSchemaValidator(schemas.getWeeklyPricesFile, needToValidateReqParams), getWeeklyPricesFileController);

router.post("/", joiSchemaValidator(schemas.loadListGoods), loadListGoodsController);
router.post("/sku-disable-status", joiSchemaValidator(schemas.changeSkuDisableStatus), changeSkuDisableStatusController);

router.post("/prices-discounts/upload/", upload.single("file"), uploadPricesAndDiscountsFileController);

router.patch(
  "/status-of-participation-in-promo/",
  joiSchemaValidator(schemas.changeStatusOfParticipationInPromo),
  changeStatusOfParticipationInPromoController,
);

router.patch(
  "/prices-discounts/",
  joiSchemaValidator(schemas.setNewPricesAndDiscountsToSku),
  setNewPricesAndDiscountsToSkuController,
  changeWeeklyPricesOrDiscountsController,
);

export default router;
