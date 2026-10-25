/**
 * @param {'enable' | 'disable'} action
 */

var toggleTablesVisibility = (year, action) => {
  var totalsTableId = "totals-table-" + year;
  var totalsTable = document.getElementById(totalsTableId);

  if (totalsTable) {
    totalsTable.hidden = action === "disable";
  }

  var skusTableScrollElemId = "scross-skus-table-" + year;
  var skusTableScrollElem = document.getElementById(skusTableScrollElemId);

  if (skusTableScrollElem) {
    skusTableScrollElem.hidden = action === "disable";
  }
};

export default toggleTablesVisibility;
