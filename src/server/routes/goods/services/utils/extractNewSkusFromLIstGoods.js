var extractNewSkusFromLIstGoods = (listGoodsFromWBAPI, listGoodsFromDb) => {
  var newSkus = [];

  for (var skuFromWBAPI of listGoodsFromWBAPI) {
    var listGoodsFilteredBySkuId = listGoodsFromDb.filter((item) => item.id === skuFromWBAPI.id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === skuFromWBAPI.skuName);

    if (!skuIsExist) {
      newSkus.push(skuFromWBAPI);
    }
  }

  return { newSkus };
};

export default extractNewSkusFromLIstGoods;
