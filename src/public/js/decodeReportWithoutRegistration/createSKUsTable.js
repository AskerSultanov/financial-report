import createTdElement from "../report/table/services/createTdElement.js";
import openCostPriceModal from "../report/table/services/modal/costPriceModal/openCostPriceModal.js";
import openOtherExpensesModal from "../report/table/services/modal/otherExpensesModal/openOtherExpensesModal.js";

var isGuestAccess = true;

var createSKUsTable = (report, skus, year) => {
  var tableBody = document.createElement("tbody");
  var { userId, taxRate, dateFrom, dateTo } = report;

  for (var sku of skus) {
    var tableRow = document.createElement("tr");
    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);

    var data = {
      year,
      userId,
      taxRate,
      dateFrom,
      dateTo,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      otherExpenses: sku.otherExpenses,
      isCrossYearPeriod: report.isCrossYearPeriod,
      sku: {
        tax: sku.tax,
        qty: sku.qty,
        profit: sku.profit,
        costPrice: sku.costPrice,
        finalProfit: sku.finalProfit,
        profitMargin: sku.profitMargin,
        retailAmount: sku.retailAmount,
        insuranceFee: sku.insuranceFee,
        preTaxProfit: sku.preTaxProfit,
        otherExpenses: sku.otherExpenses,
        additionalInsuranceFee: sku.additionalInsuranceFee,
      },
    };

    var costPriceInputField = openCostPriceModal(data, isGuestAccess);
    var otherExpensesInputField = openOtherExpensesModal(data, isGuestAccess);

    var costPrice = createTdElement(costPriceInputField);
    var otherExpenses = createTdElement(otherExpensesInputField);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var profitMarginTdId = "profitMargin" + "-" + sku.skuName + "-" + year;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit" + "-" + sku.skuName + "-" + year;
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
  table.id = "skus-table-" + year;

  var { tableHead } = createSkusTableHead();

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.append(table);
};

export default createSKUsTable;

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
          <th>Себестоимость</th>
          <th>Прочие расходы</th>
          <th>Маржинальность %</th>
          <th>Итого</th>
  </tr>`;

function createSkusTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
