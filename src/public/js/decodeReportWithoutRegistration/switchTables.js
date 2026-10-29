var totalTablesId = "totals-table-";
var skusTableScrollElemId = "scroll-skus-table-";

var switchTables = (years) => {
  for (var year of years) {
    totalTablesId += year;
    skusTableScrollElemId += year;
  }
};

export default switchTables;
