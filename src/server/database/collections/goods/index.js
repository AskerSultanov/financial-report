import { goodsModel } from "../../models/index.js";
import saveNewSkusToDb from "./services/saveNewSkusToDb.js";
import deleteListGoods from "./services/deleteListGoods.js";
import saveListGoodsToDb from "./services/saveListGoodsToDb.js";
import getListGoodsFromDb from "./services/getListGoodsFromDb.js";
import getSkuFromListGoods from "./services/getSkuFromListGoods.js";
import updateSkuInListGoods from "./services/updateSkuInListGoods.js";
import getSkusLastCostPrice from "./services/getSkusLastCostPrice.js";
import updateSkusInListGoods from "./services/updateSkusInListGoods.js";
import getAllUserListGoodsIds from "./services/getAllUserListGoodsIds.js";
import setPriceUpdateTimestampAndUpdateStatus from "./services/setPriceUpdateTimestampAndUpdateStatus.js";

var goodsCollectionServices = {
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsModel),

  getSkusLastCostPrice: (userId) => getSkusLastCostPrice(goodsModel, userId),

  getListGoodsFromDb: (userId, skuNames, selectedFields, session) => getListGoodsFromDb(goodsModel, userId, skuNames, selectedFields, session),

  getSkuFromListGoods: (userId, skuId, skuName, session) => getSkuFromListGoods(goodsModel, userId, skuId, skuName, session),

  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goodsModel, userId, listGoods, session),

  saveNewSkusToDb: (userId, newSkus, session) => saveNewSkusToDb(goodsModel, userId, newSkus, session),

  updateSkuInListGoods: (userId, skuName, data, session) => updateSkuInListGoods(goodsModel, userId, skuName, data, session),

  updateSkusInListGoods: (userId, updatedSkus, session) => updateSkusInListGoods(goodsModel, userId, updatedSkus, session),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData, session) =>
    setPriceUpdateTimestampAndUpdateStatus(goodsModel, userId, priceData, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsModel, userId, session),
};

export default goodsCollectionServices;
