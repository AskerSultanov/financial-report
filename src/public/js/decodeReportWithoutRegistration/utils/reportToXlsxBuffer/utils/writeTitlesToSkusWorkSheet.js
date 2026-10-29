import { columns } from "./writeValuesToSkusWorkSheet.js";
import setStylesToSkusWorkSheet from "./setStylesToSkusWorkSheet.js";

var titles = [
  "Артикул",
  "Кол-во",
  "Возвраты",
  "WB реализовал",
  "Налогооблагаемая база (УСН Доходы)",
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
  "Налоги",
  "Маржинальность %",
  "Итого",
];

var titleRowNum = 5;

var writeTitlesToSkusWorkSheet = (workSheet) => {
  var columnNum = 1;
  var titleCount = 0;

  for (var column of columns) {
    var title = titles[titleCount];
    var cellAddress = column + titleRowNum;

    workSheet.getCell(cellAddress).value = title;

    setStylesToSkusWorkSheet(workSheet, columnNum, cellAddress);

    columnNum++;
    titleCount++;
  }

  return workSheet;
};

export default writeTitlesToSkusWorkSheet;
