var titles = [
  "Начало отчетного периода",
  "Конец отчетного периода",
  "Сумма продаж",
  "Налогооблагаемая база (УСН Доходы)",
  "Продано шт.",
  "Возвратов шт.",
  "К перечислению за товар",
  "Себестоимость",
  "Прочите расходы",
  "Логистика",
  "Приемка",
  "Штрафы",
  "Удержания/выплаты",
  "Хранение",
  "Реклама",
  "Налоги",
  "Маржинальность %",
  "Итого",
];

var columnWidth = 30;
var columnNumOfTitles = 1;
var columnNameOfTitles = "A";

var fontStyles = { bold: true, font: 10 };
var alignmentStyles = { vertical: "middle", horizontal: "left" };

var writeTitlesToSummaryWorkSheet = (workSheet) => {
  var rowNum = 2;

  workSheet.getColumn(columnNumOfTitles).font = fontStyles;
  workSheet.getColumn(columnNumOfTitles).width = columnWidth;
  workSheet.getColumn(columnNumOfTitles).alignment = alignmentStyles;

  for (var title of titles) {
    var cellAddress = columnNameOfTitles + rowNum;

    workSheet.getCell(cellAddress).value = title;

    rowNum++;
  }

  return workSheet;
};

export default writeTitlesToSummaryWorkSheet;
