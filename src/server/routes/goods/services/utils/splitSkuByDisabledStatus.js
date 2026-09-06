var splitSkuByDisabledStatus = (listGoods) => {
  var enabledSku = [];
  var disabledSku = [];

  var filteredListGoods = listGoods.filter((sku) => !sku.deleted);

  for (var sku of filteredListGoods) {
    if (sku.disabled) {
      disabledSku.push(sku);
    } else {
      enabledSku.push(sku);
    }
  }

  return { listGoods: { enabledSku, disabledSku } };
};

export default splitSkuByDisabledStatus;
