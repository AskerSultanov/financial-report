import getListGoodsSchema from "./getListGoods.js";
import loadListGoodsSchema from "./loadListGoods.js";
import getSkusMetricsFileSchema from "./getSkusMetricsFile.js";
import getWeeklyPricesFileSchema from "./getWeeklyPricesFile.js";
import changeSkuDisableStatusSchema from "./changeSkuDisableStatus.js";
import getListGoodsAndWeeklyPricesSchema from "./getListGoodsAndWeeklyPrices.js";
import setNewPricesAndDiscountsToSkuSchema from "./setNewPricesAndDiscountsToSku.js";
import changeStatusOfParticipationInPromoSchema from "./changeStatusOfParticipationInPromo.js";

var schemas = {};

schemas.getlistGoods = getListGoodsSchema;
schemas.loadListGoods = loadListGoodsSchema;
schemas.getWeeklyPricesFile = getWeeklyPricesFileSchema;
schemas.getSkusMetricsFile = getSkusMetricsFileSchema;
schemas.changeSkuDisableStatus = changeSkuDisableStatusSchema;
schemas.getListGoodsAndWeeklyPrices = getListGoodsAndWeeklyPricesSchema;
schemas.setNewPricesAndDiscountsToSku = setNewPricesAndDiscountsToSkuSchema;
schemas.changeStatusOfParticipationInPromo = changeStatusOfParticipationInPromoSchema;

export default schemas;
