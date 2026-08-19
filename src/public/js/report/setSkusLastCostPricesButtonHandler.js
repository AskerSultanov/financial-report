import skusLastCostPriceModal from "./table/services/modal/skusLastCostPriceModal.js";

var button = document.getElementById("set-cost-prices-from-previous-report-period");

var removeDuplicateCosts = (skus, skusLastCostPrice) => {
  for (var sku of skus) {
    var matchingCostPriceIndex = skusLastCostPrice.findIndex((item) => item.skuName === sku.skuName);

    if (matchingCostPriceIndex >= 0) {
      var currentCostPrice = sku.costPrice;

      var { lastCostPrice } = skusLastCostPrice[matchingCostPriceIndex];

      if (currentCostPrice === lastCostPrice) {
        skusLastCostPrice.splice(matchingCostPriceIndex, 1);
      }
    }
  }
};

var setSkusLastCostPricesButtonHandler = (skus, reportId, taxYear, dateFrom, dateTo, skusLastCostPrice) => {
  removeDuplicateCosts(skus, skusLastCostPrice);

  skusLastCostPrice.forEach((sku) => (sku.year = taxYear));

  button.onclick = () => {
    if (skusLastCostPrice.length) {
      skusLastCostPriceModal(reportId, taxYear, skusLastCostPrice);
    } else {
      alert("Для текущих товаров нет последних себестоимостей.");
    }
  };
};

export default setSkusLastCostPricesButtonHandler;
