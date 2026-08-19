var addNewSkusToListGoods = (listGoods, skusFromFinancialReports, isCrossYearPeriod, startYear, endYear) => {
  if (!listGoods.length) {
    return { listGoodsWithNewSkus: [] };
  }

  for (var { name, id } of skusFromFinancialReports) {
    var listGoodsFilteredBySkuId = listGoods.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === name);

    if (!skuIsExist) {
      var newSku = { id, skuName: name, deleted: true };
      listGoods.push(newSku);
    }
  }

  return { listGoodsWithNewSkus: listGoods };
};

export default addNewSkusToListGoods;
