import { columns } from "./writeSKUsToSheet.js";

var titles = [
  "Артикул",
  "Кол-во",
  "Возвраты",
  "WB реализовал",
  "Выплаты продавцу",
  "Доставка",
  "Удержания/    выплаты",
  "Реклама",
  "Хранение",
  "Приемка",
  "Штрафы",
  "Выплата с вычетом всех услуг WB",
  "Себестоимость 1ед.",
  "Прочите расходы",
  "Маржинальность %",
  "Итого",
];

var fontStyles = {
  bold: true,
  font: 10,
};

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};

var writeSKUsTitleToSheet = (sheet) => {
  var cellNum = 1;
  var columnNum = 1;

  for (var i = 0; i < columns.length; i++) {
    var cellName = columns[i] + cellNum;

    sheet.getColumn(columnNum).width = 17;

    sheet.getCell(cellName).font = fontStyles;
    sheet.getCell(cellName).alignment = alignmentStyles;

    sheet.getCell(cellName).value = titles[i];

    columnNum++;
  }

  return sheet;
};

export default writeSKUsTitleToSheet;
