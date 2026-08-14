import { addDefaultMetricsToSku } from "./addDefaultMetricsToSku.js";

var addNewSkusToListGoods = (listGoods, skusFromFinancialReports, isCrossYearPeriod, startYear, endYear) => {
  if (!listGoods.length) {
    return { listGoodsWithNewSkus: [] };
  }

  var metrics = [];

  for (var { name, id } of skusFromFinancialReports) {
    var listGoodsFilteredBySkuId = listGoods.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === name);

    if (!skuIsExist) {
      var newSku = { id, skuName: name, metrics, deleted: true };
      listGoods.push(newSku);
    }
  }

  listGoods = addDefaultMetricsToSku(listGoods, isCrossYearPeriod, startYear, endYear);

  return { listGoodsWithNewSkus: listGoods };
};

export default addNewSkusToListGoods;
