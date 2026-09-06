import { fontStyles, alignmentStyles } from "./styles.js";

var writeSKU = (sku, ws, indentToSkuName) => {
  var { id, skuName, weeklyPrices, weeklyDiscounts, weeklyDiscountedPrices } = sku;

  ws.addRow([skuName]).font = fontStyles;
  ws.getRow(indentToSkuName).alignment = alignmentStyles;
  ws.getCell("A" + indentToSkuName).name = "skuName";
  ws.getCell("A" + indentToSkuName).value = skuName.toUpperCase();

  ws.addRow(["цена", ...weeklyPrices]).alignment = alignmentStyles;
  ws.addRow(["скидка", ...weeklyDiscounts]).alignment = alignmentStyles;
  ws.addRow(["цена со скидкой"]).alignment = alignmentStyles;
  ws.addRow(["интервал обновления"]).alignment = alignmentStyles;
  ws.addRow(["менять цену, если товар в акции", ...new Array(7).fill("нет")]).alignment = alignmentStyles;
  return ws;
};

export default writeSKU;
