var getSelectedLastCostPrices = (selectedYear) => {
  var list = document.getElementById("last-cost-price-list");

  var selectedLastCostPrices = [];

  for (var item of list.children) {
    var skuName;
    var lastCostPrice;

    for (var nestedItem of item.children) {
      if (nestedItem.hasAttribute("skuName")) {
        skuName = nestedItem.textContent;
      }

      if (nestedItem.hasAttribute("lastCostPrice")) {
        lastCostPrice = nestedItem.textContent;
      }
    }

    var currentSkuCostPriceElemId = "costPrice-" + skuName + "-" + selectedYear;
    var currentSkuCostPriceElem = document.getElementById(currentSkuCostPriceElemId);
    var currentSkuCostPrice = currentSkuCostPriceElem.textContent;

    if (lastCostPrice !== currentSkuCostPrice) {
      selectedLastCostPrices.push({ skuName, lastCostPrice: +lastCostPrice });
    }
  }

  return { selectedLastCostPrices };
};

export default getSelectedLastCostPrices;
