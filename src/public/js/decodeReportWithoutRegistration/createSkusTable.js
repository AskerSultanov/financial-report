import createTdElement from "./createTdElement.js";
import openEditableFieldModal from "./utils/editableFieldModal/index.js";

var createSkusTable = (report, skus) => {
  if (!skus.length) {
    return;
  }

  var tableBody = document.createElement("tbody");

  for (var sku of skus) {
    var tableRow = document.createElement("tr");

    var qty = createTdElement(sku.qty);
    var skuName = createTdElement(sku.skuName);
    var returnAmount = createTdElement(sku.returnAmount);

    var dataToUpdate = {
      qty: sku.qty,
      year: sku.year,
      profit: sku.profit,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      reportId: report.reportId,
      finalProfit: sku.finalProfit,
      retailAmount: sku.retailAmount,
      preTaxProfit: sku.preTaxProfit,
      otherExpenses: sku.otherExpenses,
      isCrossYearPeriod: report.isCrossYearPeriod,
    };

    var costPriceModal = openEditableFieldModal(dataToUpdate, "costPrice");

    var otherExpensesModal = openEditableFieldModal(
      dataToUpdate,
      "otherExpenses",
    );

    var costPrice = createTdElement(costPriceModal);
    var otherExpenses = createTdElement(otherExpensesModal);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var profitMarginTdId = "profitMargin" + "-" + sku.skuName + "-" + sku.year;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit" + "-" + sku.skuName + "-" + sku.year;
    var finalProfit = createTdElement(sku.finalProfit, finalProfitTdId);

    tableRow.append(
      skuName,
      qty,
      returnAmount,
      deliveryCost,
      deductionOrPayment,
      fines,
      storageCost,
      acceptance,
      profit,
      costPrice,
      otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tableRow);
  }

  var table = document.createElement("table");
  table.id = "skus-table-" + sku.year;

  var { tableHead } = createSkusTableHead();

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.append(table);
};

export default createSkusTable;

var tableHeadContent = `
   <tr>
          <th>Артикул</th>
          <th>Количество</th>
          <th>Возвраты</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Штрафы</th>
          <th>Хранение</th>
          <th>Приёмка</th>
          <th>Выплата с вычетом всех услуг WB</th>
          <th>Себестоимость 1ед.</th>
          <th>Прочие расходы</th>
          <th>Маржинальность %</th>
          <th>Итого</th>
  </tr>`;

function createSkusTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
