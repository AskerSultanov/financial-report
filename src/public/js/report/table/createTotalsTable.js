import createTdElement from "./services/createTdElement.js";
import openTotalsModal from "./services/modal/totalsModal/openTotalsModal.js";

var fieldsWithModal = ["tax", "insuranceFee", "additionalInsuranceFee"];

var createTotalsTable = (
  userId,
  reportId,
  recordedTo,
  reportTotals,
  year,
  isCrossYearPeriod,
  reportSummaryLabelText,
) => {
  var tableRow = document.createElement("tr");

  var yearTd = createTdElement(year);
  tableRow.append(yearTd);

  for (var key in reportTotals) {
    var elemId = year ? key + "-" + year : key + "-";

    var value = (+reportTotals[key]).toFixed(2);

    if (fieldsWithModal.includes(key)) {
      var yearToClient = isCrossYearPeriod ? year : recordedTo.year;

      var data = {
        userId,
        reportId,
        year: yearToClient,
        updateField: { key, value },
      };

      var modal = openTotalsModal(data);

      var tdElement = createTdElement(modal);
    } else {
      var tdElement = createTdElement(value, elemId);
    }

    tableRow.append(tdElement);
  }

  var tableBody = document.createElement("tbody");
  tableBody.append(tableRow);
  tableBody.id = "table-body-" + year;

  var { tableHead } = createTotalsTableHead(year);
  var table = document.createElement("table");
  table.id = "totals-table-" + year;

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");

  if (isCrossYearPeriod) {
    var { reportSummaryLabel } = createReportSummaryLabel(
      reportSummaryLabelText,
    );
    tablesContainer.append(reportSummaryLabel, table);
  } else {
    tablesContainer.append(table);
  }
};

export default createTotalsTable;

var tableHeadContent = `
            <th>Отчётный год</th>
            <th>WB реализовал</th>
            <th>Налогооблагаемая база</th>
            <th>Продано шт.</th>
            <th>Возвратов</th>
            <th>Перечисления продавцу</th>
            <th>Себестоимость товаров</th>
            <th>Прочие расходы</th>
            <th>Доставка</th>
            <th>Приёмка</th>
            <th>Штрафы</th>
            <th>Удержания/Выплаты</th>
            <th>Хранение</th>
            <th>Реклама</th>
            <th>Налоги</th>
            <th>Страховые взносы</th>
            <th>Доп. страховые взносы</th>
            <th>Маржинальность %</th>
            <th>Итого</th>
          `;

function createTotalsTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;

  return { tableHead };
}

function createReportSummaryLabel(reportSummaryLabelText) {
  var reportSummaryLabel = document.createElement("span");
  reportSummaryLabel.className = "reportTotals-summary-label";
  reportSummaryLabel.textContent = "Сводка " + reportSummaryLabelText;

  var reportSummaryLabelWrapper = document.createElement("div");
  reportSummaryLabelWrapper.className = "reportTotals-summary-label-wrapper";
  reportSummaryLabelWrapper.append(reportSummaryLabel);

  return { reportSummaryLabel: reportSummaryLabelWrapper };
}
