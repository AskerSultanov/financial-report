import Exceljs from "exceljs";
import writeSKU from "./utils/writeSKU.js";
import writeTitles from "./utils/writeTitles.js";
import setStylesToSheet from "./utils/setStylesToSheet.js";
import setFormulaToCells from "./utils/setFormulaToCells.js";
import writeInstructionsForThePriceUpdateInterval from "./utils/writeInstructionsForThePriceUpdateInterval.js";

var generateWeeklyPricesFile = async (listGoods) => {
  var wb = new Exceljs.Workbook();

  var ws = wb.addWorksheet("Лист1");
  var wsToInstructions = wb.addWorksheet("Инструкции для интервала цен");
  ws = writeTitles(ws);

  ws.addRow([]); //empty array is a indent
  ws.addRow([]);
  ws.addRow([]);

  var indentToSkuName = 5;

  var skusQty = listGoods.length;

  while (listGoods.length) {
    var sku = listGoods.shift();

    ws = writeSKU(sku, ws, indentToSkuName);
    ws.addRow([]);
    ws.addRow([]);

    indentToSkuName += 8;
  }

  ws = setStylesToSheet(ws);
  ws = setFormulaToCells(ws, skusQty);
  ws = writeInstructionsForThePriceUpdateInterval(wsToInstructions);

  var buffer = await wb.xlsx.writeBuffer("weeklyPrices.xlsx");
  return { buffer };
};

export default generateWeeklyPricesFile;
