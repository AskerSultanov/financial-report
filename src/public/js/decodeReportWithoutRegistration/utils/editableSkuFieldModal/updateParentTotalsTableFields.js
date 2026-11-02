import calcProfitMargin from "../calcUtils/utils/profitMargin.js";
import getYearsFromChildTables from "./getYearsFromChildTables.js";

var fieldsToUpdate = ["costPrice-", "finalProfit-", "otherExpenses-"];

var updateParentTotalsTableFields = (year, reportId) => {
  var { years } = getYearsFromChildTables();

  for (var field of fieldsToUpdate) {
    var totalValue = 0;

    for (var year of years) {
      var childTbodyElemId = field + reportId + "-" + year;
      var childTbodyElem = document.getElementById(childTbodyElemId);

      var elemVal = +childTbodyElem.textContent;

      totalValue += elemVal;
    }

    var totalTbodyElemId = field;
    var totalTbodyElem = document.getElementById(totalTbodyElemId);

    if (Number.isFinite(totalValue)) {
      totalTbodyElem.textContent = totalValue;
    }
  }

  var finalProfitId = `finalProfit-${reportId}-`;
  var retailAmountId = `retailAmount-${reportId}-`;
  var profitMarginId = `profitMargin-${reportId}-`;

  var finalProfitEl = document.getElementById(finalProfitId);
  var retailAmountEl = document.getElementById(retailAmountId);
  var profitMarginEl = document.getElementById(profitMarginId);

  var finalProfit = +finalProfitEl.textContent;
  var retailAmount = +retailAmountEl.textContent;

  var margin = calcProfitMargin(finalProfit, retailAmount);

  profitMarginEl.textContent = margin;
};

export default updateParentTotalsTableFields;
