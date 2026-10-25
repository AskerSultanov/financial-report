/**
 * @param {'enable' | 'disable'} action
 */

var toggleTablesVisibility = (year, action) => {
  action = action === "disable";

  var totalsTableId = "totals-table-" + year;
  var totalsTable = document.getElementById(totalsTableId);

  if (totalsTable) {
    totalsTable.hidden = action;
  }

  var skusTableScrollElemId = "scroll-skus-table-" + year;
  var skusTableScrollElem = document.getElementById(skusTableScrollElemId);

  if (skusTableScrollElem) {
    skusTableScrollElem.hidden = action;
  }

  var summaryTextElemId = "summary-text-" + year;
  var summaryTextElem = document.getElementById(summaryTextElemId);

  if (summaryTextElem) {
    summaryTextElem.hidden = action;
  }
};

export default toggleTablesVisibility;
