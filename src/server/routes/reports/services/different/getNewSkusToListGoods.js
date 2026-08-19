var addNewSkusToListGoods = (listGoods, skusFromFinancialReports) => {
  var newSkus = [];

  for (var { name, id } of skusFromFinancialReports) {
    var listGoodsFilteredBySkuId = listGoods.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === name);

    if (!skuIsExist) {
      var newSku = { id, skuName: name };
      newSkus.push(newSku);
    }
  }

  return { newSkus };
};

export default addNewSkusToListGoods;
