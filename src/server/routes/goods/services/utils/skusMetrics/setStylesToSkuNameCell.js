var firstColumnName = "A";
var secondColumnName = "B";
var thirdColumnName = "C";

var fontStyles = { bold: true };
var alignmentStyles = { vertical: "middle", horizontal: "center" };

var setStylesToSkuNameCell = function (ws, indentToNextSku) {
  ws.getCell(firstColumnName + indentToNextSku).font = fontStyles;
  ws.getCell(firstColumnName + indentToNextSku).alignment = alignmentStyles;

  ws.getCell(secondColumnName + indentToNextSku).font = fontStyles;
  ws.getCell(secondColumnName + indentToNextSku).alignment = alignmentStyles;

  ws.getCell(thirdColumnName + indentToNextSku).font = fontStyles;
  ws.getCell(thirdColumnName + indentToNextSku).alignment = alignmentStyles;

  return ws;
};

export default setStylesToSkuNameCell;
