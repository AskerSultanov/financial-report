var splitListGoodsByExistence = (listGoodsFromDb, listGoodsFromWBAPI) => {
  var newSkus = [];
  var updatedSkus = [];

  for (var skuFromWBAPI of listGoodsFromWBAPI) {
    var existSku = listGoodsFromDb.find((item) => item.skuName === skuFromWBAPI.skuName && item.id === skuFromWBAPI.id);
    if (existSku) {
      updatedSkus.push(skuFromWBAPI);
    } else {
      newSkus.push(skuFromWBAPI);
    }
  }

  return { newSkus, updatedSkus };
};

export default splitListGoodsByExistence;
