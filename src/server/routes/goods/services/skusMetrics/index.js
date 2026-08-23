import Exceljs from "exceljs";
import writeSkuDataToCells from "./writeSkuDataToCells.js";
import setColumnHeaderWidths from "./setColumnHeaderWidths.js";
import setStylesToSkuNameCell from "./setStylesToSkuNameCell.js";
import setStylesToFirstColumn from "./setStylesToFirstColumn.js";
import writeCellNamesToFirstColumn from "./writeCellNamesToFirstColumn.js";

var columns = ["B", "C", "D", "E", "F", "G", "H"];

var generageSKusMetricsFile = async (mergedSkus) => {
  var wb = new Exceljs.Workbook();
  var ws = wb.addWorksheet("Лист1");

  ws = setStylesToFirstColumn(ws);
  ws = setColumnHeaderWidths(ws, mergedSkus);

  var count = 0;
  var indentToNextSku = 1;

  for (var { data } of mergedSkus) {
    for (var sku of data) {
      var column = columns[count];

      ws = writeCellNamesToFirstColumn(ws, sku, indentToNextSku);
      ws = setStylesToSkuNameCell(ws, indentToNextSku);
      ws = writeSkuDataToCells(ws, sku, indentToNextSku, column);

      indentToNextSku += 21;
    }

    count++;
    indentToNextSku = 1;
  }

  var skusMetricsFileBuffer = await wb.xlsx.writeBuffer("file.xlsx");
  return { skusMetricsFileBuffer };
};

export default generageSKusMetricsFile;
