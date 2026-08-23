var totalTitles = [
  "Начало отчетного периода",
  "Конец отчетного периода",
  "ID отчета",
  "Сумма продаж",
  "Налогооблагаемая база",
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
  "Cтраховые взносы",
  "Доп. страховые взносы",
  "Маржинальность %",
  "Итого",
];

var fontStyles = { bold: true, font: 10 };
var alignmentStyles = { vertical: "middle", horizontal: "left" };

var writeTotalsTitleToSheet = (sheet, cellNum) => {
  var cellName = "A";
  var firstColumnNum = 1;

  sheet.getColumn(firstColumnNum).width = 27;
  sheet.getColumn(firstColumnNum).font = fontStyles;
  sheet.getColumn(firstColumnNum).alignment = alignmentStyles;

  for (var title of totalTitles) {
    var currentCell = cellName + cellNum;

    sheet.getCell(currentCell).value = title;

    cellNum++;
  }

  return sheet;
};

export default writeTotalsTitleToSheet;
