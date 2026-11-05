import createTdElement from "./createTdElement.js";

var createTotalsTable = (report, year = "") => {
  var tableRow = document.createElement("tr");

  for (var key in report) {
    var keyWithoutYear = `${key}-`;
    var keyWithYear = `${key}-${year}`;

    var elemId = year ? keyWithYear : keyWithoutYear;

    var tdElement = createTdElement(report[key], elemId);
    tableRow.append(tdElement);
  }

  var tableBody = document.createElement("tbody");

  tableBody.append(tableRow);
  tableBody.id = "table-body-" + year;

  if (year) {
    tableBody.setAttribute("year", year);
  }

  var { tableHead } = createTotalsTableHead();

  var table = document.createElement("table");
  table.id = "totals-table-" + year;

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");

  tablesContainer.append(table);
};

var tableHeadContent = `<tr>
            <th>WB реализовал</th>
            <th>Продано шт.</th>
            <th>Возвратов</th>
            <th>Перечисления продавцу</th>
            <th>Доставка</th>
            <th>Приёмка</th>
            <th>Штрафы</th>
            <th>Удержания/Выплаты</th>
            <th>Хранение</th>
            <th>Себестоимость</th>
            <th>Прочие расходы</th>
            <th>Реклама</th>
            <th>Маржа %</th>
            <th>Итого</th>
            </tr>
          `;

function createTotalsTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;

  return { tableHead };
}

export default createTotalsTable;
