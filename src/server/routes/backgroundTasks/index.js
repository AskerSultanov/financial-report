import { Router } from "express";
import checkAuthController from "./controllers/checkAuth.js";
import updateDataIntoListGoodsController from "./controllers/updateDataIntoListGoods.js";
import uploadToWBAPITodayPricesAndDiscountsController from "./controllers/uploadToWBAPITodayPricesAndDiscounts.js";
import checkProcessingOfPricesAndDiscountsController from "./controllers/checkProcessingOfPricesAndDiscounts.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/upload-new-prices-discounts", checkAuthController, uploadToWBAPITodayPricesAndDiscountsController);

router.post("/get-current-prices-discounts", checkAuthController, updateDataIntoListGoodsController);

router.post("/check-processing-of-prices-discounts", checkAuthController, checkProcessingOfPricesAndDiscountsController);

export default router;
