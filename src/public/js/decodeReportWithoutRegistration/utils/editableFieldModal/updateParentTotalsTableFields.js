import calcProfitMargin from "../calcUtils/utils/profitMargin.js";

var updateParentTotalsTableFields = (year, childTablePrevData) => {
  var parentTableFinalProfitElemId = "finalProfit-";
  var parentTableRetailAmountElemId = "retailAmount-";
  var parentTableProfitMarginElemId = "profitMargin-";

  var parentTableFinalProfitElem = document.getElementById(
    parentTableFinalProfitElemId,
  );

  var parentTableRetailAmountElem = document.getElementById(
    parentTableRetailAmountElemId,
  );

  var parentTableProfitMarginElem = document.getElementById(
    parentTableProfitMarginElemId,
  );

  var parentTablePrevFinalProfitElemVal =
    +parentTableFinalProfitElem.textContent;

  var parentTableRetailAmountElemVal = +parentTableRetailAmountElem.textContent;

  var childFinalProfitElemId = "finalProfit-" + year;
  var childFinalProfitElem = document.getElementById(childFinalProfitElemId);
  var childFinalProfitElemValue = +childFinalProfitElem.textContent;

  var recalculatedFinalProfit =
    parentTablePrevFinalProfitElemVal -
    childTablePrevData.childPrevFinalProfitElemVal +
    childFinalProfitElemValue;

  var profitMargin = calcProfitMargin(
    recalculatedFinalProfit,
    parentTableRetailAmountElemVal,
  );

  parentTableProfitMarginElem.textContent = profitMargin;
  parentTableFinalProfitElem.textContent = recalculatedFinalProfit.toFixed(2);
};

export default updateParentTotalsTableFields;
