var splitListGoodsByExistence = (listGoodsFromDb, listGoodsFromWBAPI) => {
  var newSkus = [];
  var updatedSkus = [];

  for (var skuFromWBAPI of listGoodsFromWBAPI) {
    var existSku = listGoodsFromDb.find((item) => item.skuName === skuFromWBAPI.skuName && item.id === skuFromWBAPI.id);

    if (existSku) {
      var updatedSku = {
        skuName: existSku.skuName,
        data: {
          price: skuFromWBAPI.price,
          discount: skuFromWBAPI.discount,
          discountedPrice: skuFromWBAPI.discountedPrice,
          clubDiscountedPrice: skuFromWBAPI.clubDiscountedPrice,
        },
      };

      updatedSkus.push(updatedSku);
    } else {
      newSkus.push(skuFromWBAPI);
    }
  }

  return { newSkus, updatedSkus };
};

export default splitListGoodsByExistence;
