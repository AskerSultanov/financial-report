var removeDublicates = (listGoodsFromDb, listGoodsFromWBAPI) => {
  if (!listGoodsFromWBAPI.length) {
    return { dedublicatedListGoods: listGoodsFromDb };
  } else if (!listGoodsFromDb.length) {
    return { dedublicatedListGoods: listGoodsFromWBAPI };
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
