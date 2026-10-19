var expectedQtyTitleColumnName = "N";
var expectedCountryTitleName = "AY";
var expectedFinesTitleColumnName = "AO";
var expectedOrderDateTitleColumnName = "L";
var expectedSaleDateTitleColumnName = "M";
var expectedDocTypeNameTitleColumnName = "J";
var expectedRetailPriceTitleColumnName = "O";
var expectedRetailAmountTitleColumnName = "P";
var expectedStorageCostTitleColumnName = "BH";
var expectedReturnAmountTitleColumnName = "AJ";
var expectedDeliveryCostTitleColumnName = "AK";
var expectedPaidAcceptanceTitleColumnName = "BJ";
var expectedAdditionalPaymentTitleColumnName = "AP";
var expectedSellerPayoutAmountTitleColumnName = "AH";
var expectedDeductionOrPaymentTitleColumnName = "BI";

var qtyTitleText = "Кол-во";
var countryTitleText = "Страна";
var storageCostTitleText = "Хранение";
var saleDateTitleText = "Дата продажи";
var finesTitleText = "Общая сумма штрафов";
var docTypeNameTitleText = "Тип документа";
var retailPriceTitleText = "Цена розничная";
var deductionOrPaymentTitleText = "Удержания";
var returnAmountTitleText = "Количество возврата";
var orderDateTitleText = "Дата заказа покупателем";
var paidAcceptanceTitleText = "Операции на приемке";
var otherPaidAcceptanceTitleText = "Услуга по обработке Товара";
var retailAmountTitleText = "Вайлдберриз реализовал Товар (Пр)";
var deliveryCostTitleText = "Услуги по доставке товара покупателю";
var additionalPaymentTitleText =
  "Корректировка Вознаграждения Вайлдберриз (ВВ)";
var sellerPayoutAmountTitleText =
  "К перечислению Продавцу за реализованный Товар";

var titlesRowNum = 1;

function getRequiredColumnsNameFromWeeklyFinanfialReportFile(
  workSheet,
  columnsNames,
) {
  var topCells = [];
  var requiredColumnsName = {};

  for (var colName of columnsNames) {
    var cellAddress = colName + titlesRowNum;
    var colTitle = workSheet.getCell(cellAddress).value;
    topCells.push({ colName, colTitle });
  }

  var qtyCellAddress = expectedQtyTitleColumnName + titlesRowNum;

  var qtyColumn = workSheet.getCell(qtyCellAddress).value === qtyTitleText;

  if (!qtyColumn) {
    qtyColumn = topCells.find(
      (colName) => colName.colTitle === qtyTitleText,
    ).colName;
  } else {
    qtyColumn = expectedQtyTitleColumnName;
  }
  requiredColumnsName.qtyColumn = qtyColumn;

  var countryCellAddress = expectedCountryTitleName + titlesRowNum;

  var countryColumn =
    workSheet.getCell(countryCellAddress).value === countryTitleText;

  if (!countryColumn) {
    countryColumn = topCells.find(
      (colName) => colName.colTitle === countryTitleText,
    ).colTitle;
  } else {
    countryColumn = expectedCountryTitleName;
  }
  requiredColumnsName.countryColumn = countryColumn;

  var saleDateCellAddress = expectedSaleDateTitleColumnName + titlesRowNum;

  var saleDateColumn =
    workSheet.getCell(saleDateCellAddress).value === saleDateTitleText;

  if (!saleDateColumn) {
    saleDateColumn = topCells.find(
      (colName) => colName.colTitle === saleDateTitleText,
    ).colName;
  } else {
    saleDateColumn = expectedSaleDateTitleColumnName;
  }
  requiredColumnsName.saleDateColumn = saleDateColumn;

  var storageCellAddress = expectedStorageCostTitleColumnName + titlesRowNum;

  var storageCostColumn =
    workSheet.getCell(storageCellAddress).value === storageCostTitleText;

  if (!storageCostColumn) {
    storageCostColumn = topCells.find(
      (colName) => colName.colTitle === storageCostTitleText,
    ).colName;
  } else {
    storageCostColumn = expectedStorageCostTitleColumnName;
  }
  requiredColumnsName.storageCostColumn = storageCostColumn;

  var docTypeNameCellAddress =
    expectedDocTypeNameTitleColumnName + titlesRowNum;

  var docTypeNameColumn =
    workSheet.getCell(docTypeNameCellAddress).value === docTypeNameTitleText;

  if (!docTypeNameColumn) {
    docTypeNameColumn = topCells.find(
      (colName) => colName.colTitle === docTypeNameTitleText,
    ).colName;
  } else {
    docTypeNameColumn = expectedDocTypeNameTitleColumnName;
  }
  requiredColumnsName.docTypeNameColumn = docTypeNameColumn;

  var finesCellAddress = expectedFinesTitleColumnName + titlesRowNum;
  var finesColumn =
    workSheet.getCell(finesCellAddress).value === finesTitleText;

  if (!finesColumn) {
    finesColumn = topCells.find(
      (colName) => colName.colTitle === finesTitleText,
    ).colName;
  } else {
    finesColumn = expectedFinesTitleColumnName;
  }
  requiredColumnsName.finesColumn = finesColumn;

  var retailPriceCellAddress =
    expectedRetailPriceTitleColumnName + titlesRowNum;

  var retailPriceColumn =
    workSheet.getCell(retailPriceCellAddress).value === retailPriceTitleText;

  if (!retailPriceColumn) {
    retailPriceColumn = topCells.find(
      (colName) => colName.colTitle === retailPriceTitleText,
    ).colName;
  } else {
    retailPriceColumn = expectedRetailPriceTitleColumnName;
  }
  requiredColumnsName.retailPriceColumn = retailPriceColumn;

  var deductionOrPaymentCellAddress =
    expectedDeductionOrPaymentTitleColumnName + titlesRowNum;

  var deductionOrPaymentColumn =
    workSheet.getCell(deductionOrPaymentCellAddress).value ===
    deductionOrPaymentTitleText;

  if (!deductionOrPaymentColumn) {
    deductionOrPaymentColumn = topCells.find(
      (colName) => colName.colTitle === deductionOrPaymentTitleText,
    ).colName;
  } else {
    deductionOrPaymentColumn = expectedDeductionOrPaymentTitleColumnName;
  }
  requiredColumnsName.deductionOrPaymentColumn = deductionOrPaymentColumn;

  var returnAmountCellAddress =
    expectedReturnAmountTitleColumnName + titlesRowNum;

  var returnAmountColumn =
    workSheet.getCell(returnAmountCellAddress).value === returnAmountTitleText;

  if (!returnAmountColumn) {
    returnAmountColumn = topCells.find(
      (colName) => colName.colTitle === returnAmountTitleText,
    ).colName;
  } else {
    returnAmountColumn = expectedReturnAmountTitleColumnName;
  }
  requiredColumnsName.returnAmountColumn = returnAmountColumn;

  var orderDateCellAddress = expectedOrderDateTitleColumnName + titlesRowNum;

  var orderDateColumn =
    workSheet.getCell(orderDateCellAddress).value === orderDateTitleText;

  if (!orderDateColumn) {
    orderDateColumn = topCells.find(
      (colName) => colName.colTitle === orderDateTitleText,
    ).colName;
  } else {
    orderDateColumn = expectedOrderDateTitleColumnName;
  }
  requiredColumnsName.orderDateColumn = orderDateColumn;

  var paidAcceptanceCellAddress =
    expectedPaidAcceptanceTitleColumnName + titlesRowNum;

  var paidAcceptanceCellContent = workSheet.getCell(
    paidAcceptanceCellAddress,
  ).value;

  var paidAcceptanceColumn =
    paidAcceptanceCellContent === paidAcceptanceTitleText &&
    paidAcceptanceCellContent === otherPaidAcceptanceTitleText;

  if (!paidAcceptanceColumn) {
    paidAcceptanceColumn = topCells.find(
      (colName) =>
        colName.colTitle === paidAcceptanceTitleText ||
        colName.colTitle === otherPaidAcceptanceTitleText,
    ).colName;
  } else {
    paidAcceptanceColumn = expectedPaidAcceptanceTitleColumnName;
  }
  requiredColumnsName.paidAcceptanceColumn = paidAcceptanceColumn;

  var retailAmountCellAddress =
    expectedRetailAmountTitleColumnName + titlesRowNum;

  var retailAmountColumn =
    workSheet.getCell(retailAmountCellAddress).value === retailAmountTitleText;

  if (!retailAmountColumn) {
    retailAmountColumn = topCells.find(
      (colName) => colName.colTitle === retailAmountTitleText,
    ).colName;
  } else {
    retailAmountColumn = expectedRetailAmountTitleColumnName;
  }
  requiredColumnsName.retailAmountColumn = retailAmountColumn;

  var deliveryCostCellAddress =
    expectedDeliveryCostTitleColumnName + titlesRowNum;

  var deliveryCostColumn =
    workSheet.getCell(deliveryCostCellAddress).value === deliveryCostTitleText;

  if (!deliveryCostColumn) {
    deliveryCostColumn = topCells.find(
      (colName) => colName.colTitle === deliveryCostTitleText,
    ).colName;
  } else {
    deliveryCostColumn = expectedDeliveryCostTitleColumnName;
  }
  requiredColumnsName.deliveryCostColumn = deliveryCostColumn;

  var additionalPaymentCellAddress =
    expectedAdditionalPaymentTitleColumnName + titlesRowNum;

  var additionalPaymentColumn =
    workSheet.getCell(additionalPaymentCellAddress).value ===
    additionalPaymentTitleText;

  if (!additionalPaymentColumn) {
    additionalPaymentColumn = topCells.find(
      (colName) => colName.colTitle === additionalPaymentTitleText,
    ).colName;
  } else {
    additionalPaymentColumn = expectedAdditionalPaymentTitleColumnName;
  }
  requiredColumnsName.additionalPaymentColumn = additionalPaymentColumn;

  var sellerPayoutAmountCellAddress =
    expectedSellerPayoutAmountTitleColumnName + titlesRowNum;

  var sellerPayoutAmountColumn =
    workSheet.getCell(sellerPayoutAmountCellAddress).value ===
    sellerPayoutAmountTitleText;

  if (!sellerPayoutAmountColumn) {
    sellerPayoutAmountColumn = topCells.find(
      (colName) => colName.colTitle === sellerPayoutAmountTitleText,
    ).colName;
  } else {
    sellerPayoutAmountColumn = expectedSellerPayoutAmountTitleColumnName;
  }
  requiredColumnsName.sellerPayoutAmountColumn = sellerPayoutAmountColumn;

  return { requiredColumnsName };
}

export default getRequiredColumnsNameFromWeeklyFinanfialReportFile;
