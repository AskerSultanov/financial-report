import calcProfitMargin from "../calcUtils/utils/profitMargin.js";

var updateParentTotalsTableFields = (year, childTablePrevData) => {
  var finalProfitId = "finalProfit-";
  var retailAmountId = "retailAmount-";
  var profitMarginId = "profitMargin-";

  var finalProfitEl = document.getElementById(finalProfitId);
  var retailAmountEl = document.getElementById(retailAmountId);
  var profitMarginEl = document.getElementById(profitMarginId);

  var prevFinalProfit = +finalProfitEl.textContent;
  var retailAmount = +retailAmountEl.textContent;

  var childFinalProfitEl = document.getElementById("finalProfit-" + year);
  var childFinalProfit = +childFinalProfitEl.textContent;

  var newFinalProfit =
    prevFinalProfit -
    childTablePrevData.childPrevFinalProfitElemVal +
    childFinalProfit;

  var margin = calcProfitMargin(newFinalProfit, retailAmount);

  profitMarginEl.textContent = margin;
  finalProfitEl.textContent = newFinalProfit.toFixed(2);
};

export default updateParentTotalsTableFields;
