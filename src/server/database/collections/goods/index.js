import { goodsCollection } from "../../connections/index.js";
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
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsCollection),

  getSkusLastCostPrice: (userId) => getSkusLastCostPrice(goodsCollection, userId),

  getListGoodsFromDb: (userId, skuNames, selectedFields, session) => getListGoodsFromDb(goodsCollection, userId, skuNames, selectedFields, session),

  getSkuFromListGoods: (userId, skuId, skuName, session) => getSkuFromListGoods(goodsCollection, userId, skuId, skuName, session),

  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goodsCollection, userId, listGoods, session),

  saveNewSkusToDb: (userId, newSkus, session) => saveNewSkusToDb(goodsCollection, userId, newSkus, session),

  updateSkuInListGoods: (userId, skuName, data, session) => updateSkuInListGoods(goodsCollection, userId, skuName, data, session),

  updateSkusInListGoods: (userId, updatedSkus, session) => updateSkusInListGoods(goodsCollection, userId, updatedSkus, session),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData, session) =>
    setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsCollection, userId, session),
};

export default goodsCollectionServices;
