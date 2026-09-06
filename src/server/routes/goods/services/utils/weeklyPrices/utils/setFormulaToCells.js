var columns = ["B", "C", "D", "E", "F", "G", "H"];

var setFormulaToCells = (ws, skusQty) => {
  columns.map((column) => {
    var count = skusQty;

    var indentToPrice = 6;
    var indentToDiscount = 7;
    var indentToResult = 8;

    while (count > 0) {
      var priceCellAddress = column + indentToPrice;
      var discountCellAddress = column + indentToDiscount;

      var formula = `${priceCellAddress}  - (${priceCellAddress} * ${discountCellAddress}) /  100`;

      var resultCellAddress = column + indentToResult;
      ws.getCell(resultCellAddress).value = { formula };

      count--;
      indentToPrice += 8;
      indentToDiscount += 8;
      indentToResult += 8;
    }

    indentToPrice = 6;
    indentToDiscount = 7;
    indentToResult = 8;
  });

  return ws;
};

export default setFormulaToCells;
