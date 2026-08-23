import createTdElement from "./services/createTdElement.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";
import openCostPriceModal from "./services/modal/costPriceModal/openCostPriceModal.js";
import openOtherExpensesModal from "./services/modal/otherExpensesModal/openOtherExpensesModal.js";

var isGuestAccess = false;

var createSkusTable = (userId, reportId, year, skus) => {
  var tableBody = document.createElement("tbody");
  tableBody.id = "skus-tbody-" + year;

  for (var sku of skus) {
    var tr = document.createElement("tr");
    tr.id = sku.skuName + "-" + sku.year;

    var data = {
      year,
      userId,
      reportId,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      otherExpenses: sku.otherExpenses,
    };

    var costPriceInputField = openCostPriceModal(data, isGuestAccess);
    var otherExpensesInputField = openOtherExpensesModal(data, isGuestAccess);
    var skuPhotoUploader = createSKUPhotoUploader(reportId, sku.skuName);

    var photoElemId = "photo-cell-" + sku.skuName + "-" + year;
    var skuPhotoUploaderTd = createTdElement(skuPhotoUploader, photoElemId, "photo-cell");

    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);
    var costPrice = createTdElement(costPriceInputField);
    var otherExpenses = createTdElement(otherExpensesInputField);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var insuranceFeeTdId = "insuranceFee-" + sku.skuName + "-" + year;
    var insuranceFee = createTdElement(sku.insuranceFee, insuranceFeeTdId);

    var profitMarginTdId = "profitMargin-" + sku.skuName + "-" + year;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit-" + sku.skuName + "-" + year;
    var finalProfit = createTdElement(sku.finalProfit, finalProfitTdId);

    if (sku.profitMargin < 0) {
      profitMargin.style.color = "red";
    }

    if (sku.finalProfit < 0) {
      finalProfit.style.color = "red";
    }

    tr.append(
      skuPhotoUploaderTd,
      skuName,
      qty,
      returnAmount,
      deliveryCost,
      deductionOrPayment,
      fines,
      storageCost,
      acceptance,
      profit,
      insuranceFee,
      costPrice,
      otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tr);
  }

  var table = document.createElement("table");
  table.id = "skus-table-" + year;

  var { tableHead } = createSkusTableHead();

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.append(table);
};

export default createSkusTable;

var tableHeadContent = `
        <tr>
          <th>Фото</th>
          <th>Артикул</th>
          <th>Количество</th>
          <th>Возвраты</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Штрафы</th>
          <th>Хранение</th>
          <th>Приёмка</th>
          <th>Выплата с вычетом всех услуг WB</th>
          <th>Страховые взносы</th>
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
