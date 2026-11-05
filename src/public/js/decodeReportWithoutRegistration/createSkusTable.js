import createTdElement from "./createTdElement.js";
import createActionBar from "./createActionBar.js";
import wrapTableToScrollElem from "./wrapTableToScroll.js";
import openEditableSkuFieldModal from "./utils/editableSkuFieldModal/index.js";

var hasNoSalesMsg =
  "Себестоимость не будет установлена: отсутствуют проданные единицы.";

var tablesContainer = document.getElementById("tables-container");

var createSkusTable = (skus, reportId, isCrossYearPeriod) => {
  if (!skus.length) {
    return;
  }

  var tableBody = document.createElement("tbody");

  for (var sku of skus) {
    var tableRow = document.createElement("tr");
    tableRow.id = `sku-table-row-${sku.skuName}-${sku.year}`;

    var qty = createTdElement(sku.qty);
    var skuName = createTdElement(sku.skuName);
    var returnAmount = createTdElement(sku.returnAmount);

    var dataToUpdate = {
      reportId,
      isCrossYearPeriod,

      qty: sku.qty,
      year: sku.year,
      profit: sku.profit,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      finalProfit: sku.finalProfit,
      retailAmount: sku.retailAmount,
      preTaxProfit: sku.preTaxProfit,
      otherExpenses: sku.otherExpenses,
    };

    var hasNoSales = sku.profit === 0 || sku.qty === 0;

    var costPriceTdElem;

    if (!hasNoSales) {
      var costPriceModal = openEditableSkuFieldModal(dataToUpdate, "costPrice");
      costPriceTdElem = createTdElement(costPriceModal);
    } else {
      costPriceTdElem = createTdElement(0);
      costPriceTdElem.title = hasNoSalesMsg;
    }

    var otherExpensesModal = openEditableSkuFieldModal(
      dataToUpdate,
      "otherExpenses",
    );

    var otherExpenses = createTdElement(otherExpensesModal);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var profitMarginTdId = `profitMargin-${sku.skuName}-${sku.year}`;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = `finalProfit-${sku.skuName}-${sku.year}`;
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
      costPriceTdElem,
      otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tableRow);
  }

  var table = document.createElement("table");
  table.id = "skus-table-" + sku.year;

  var { tableHead } = createSkusTableHead(sku.year);

  table.append(tableHead, tableBody);

  var wrappedToScrollTable = wrapTableToScrollElem(table);

  if (skus.length > 1) {
    var { actionBar } = createActionBar(
      skus,
      reportId,
      isCrossYearPeriod,
      wrappedToScrollTable,
    );

    tablesContainer.append(actionBar, wrappedToScrollTable);
  } else {
    tablesContainer.append(wrappedToScrollTable);
  }
};

export default createSkusTable;

function createSkusTableHead(year) {
  var tableHeadContent = `
   <tr id="thead-tr-${year}">
          <th>Артикул</th>
          <th>Количество</th>
          <th>Возвраты</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Штрафы</th>
          <th>Хранение</th>
          <th>Приёмка</th>
          <th>Перечисления продавцу</th>
          <th>Себестоимость 1ед.</th>
          <th>Прочие расходы</th>
          <th>Маржа %</th>
          <th>Итого</th>
  </tr>`;

  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
