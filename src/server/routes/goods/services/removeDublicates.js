var removeDublicates = (listGoodsFromDb, listGoodsFromWBAPI) => {
  if (!listGoodsFromDb.length || !listGoodsFromWBAPI.length) {
    return { dedublicatedListGoods: [] };
  }

  for (var skuFromWBAPI of listGoodsFromWBAPI) {
    var skuExistInDb = listGoodsFromDb.find((skuFromDb) => skuFromDb.skuName === skuFromWBAPI.skuName);

    if (!skuExistInDb) {
      listGoodsFromDb.push(skuFromWBAPI);
    }
  }

  return { dedublicatedListGoods: listGoodsFromDb };
};

export default removeDublicates;
