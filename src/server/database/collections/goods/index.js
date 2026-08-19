import { goodsCollection } from "../../connections/index.js";
import saveNewSkusToDb from "./services/saveNewSkusToDb.js";
import updateSingleSku from "./services/updateSingleSku.js";
import deleteListGoods from "./services/deleteListGoods.js";
import updateSkusFields from "./services/updateSkusFields.js";
import saveListGoodsToDb from "./services/saveListGoodsToDb.js";
import getListGoodsFromDb from "./services/getListGoodsFromDb.js";
import updateSkuInListGoods from "./services/updateSkuInListGoods.js";
import getSkuFromListGoods from "./services/getSkuFromListGoods.js";
import getSkusLastCostPrice from "./services/getSkusLastCostPrice.js";
import updateSkuDisableStatus from "./services/updateSkuDisableStatus.js";
import getAllUserListGoodsIds from "./services/getAllUserListGoodsIds.js";
import setPriceUpdateTimestampAndUpdateStatus from "./services/setPriceUpdateTimestampAndUpdateStatus.js";

var goodsCollectionServices = {
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsCollection),

  getSkusLastCostPrice: (userId) => getSkusLastCostPrice(goodsCollection, userId),

  getListGoodsFromDb: (userId, skuNames, session) => getListGoodsFromDb(goodsCollection, userId, skuNames, session),

  getSkuFromListGoods: (userId, skuId, skuName, session) => getSkuFromListGoods(goodsCollection, userId, skuId, skuName, session),

  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goodsCollection, userId, listGoods, session),

  saveNewSkusToDb: (userId, newSkus, session) => saveNewSkusToDb(goodsCollection, userId, newSkus, session),

  updateSingleSku: (userId, sku, session) => updateSingleSku(goodsCollection, userId, sku, session),

  updateSkusFields: (userId, updatedSkus, session) => updateSkusFields(goodsCollection, userId, updatedSkus, session),

  updateSkuInListGoods: (userId, skuId, skuName, data, session) => updateSkuInListGoods(goodsCollection, userId, skuId, skuName, data, session),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) => updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData, session) =>
    setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsCollection, userId, session),
};

export default goodsCollectionServices;
