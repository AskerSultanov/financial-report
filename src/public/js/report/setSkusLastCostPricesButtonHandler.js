import skusLastCostPriceModal from "./table/services/modal/lastCostPricesModal/index.js";

var button = document.getElementById(
  "set-cost-prices-from-previous-report-period",
);

var setSkusLastCostPricesButtonHandler = (
  skus,
  years,
  basicReportData,
  lastCostPrices,
) =>
  (button.onclick = () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (hasActiveModal) {
      return;
    }

    if (lastCostPrices.length) {
      skusLastCostPriceModal(skus, years, basicReportData, lastCostPrices);
    } else {
      alert("Для текущих товаров нет последних себестоимостей.");
    }
  });

export default setSkusLastCostPricesButtonHandler;
