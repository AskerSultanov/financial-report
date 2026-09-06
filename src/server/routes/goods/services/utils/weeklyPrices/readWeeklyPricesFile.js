import Exceljs from "exceljs";
import checkPriceAndDiscount from "./utils/checkPriceAndDiscount.js";

var MAX_NUMBER_COLUMNS_FOR_READING = 8;

var readWeeklyPricesFile = async (xlsxFileBuffer, listGoods) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(xlsxFileBuffer);

  var ws = wb.getWorksheet("Лист1");

  var skuNamesAndIds = [];
  var skuNameIndent = 5;
  var firstColumnName = "A";
  var skusQty = listGoods.length;
  var skuNameCellAddress = firstColumnName + skuNameIndent;

  while (skusQty) {
    var cell = ws.getCell(skuNameCellAddress);

    if (cell?.value) {
      var existSku = listGoods.find((sku) => sku.skuName === cell.value.toLowerCase());

      if (existSku && !existSku?.disabled) {
        skuNamesAndIds.push({ skuName: cell.value.toLowerCase(), nmID: existSku.id });
      }
    }

    skusQty--;
    skuNameIndent += 7;
    skuNameCellAddress = firstColumnName + skuNameIndent;
  }

  if (!skuNamesAndIds.length) {
    throw new Error("Не удалось прочитать наименования артикулов");
  }

  var columnCount = 0;
  var columnNum = 2;
  var price;
  var priceIndent = 6;
  var priceCellAddress;
  var discount;
  var discountIndent = 7;
  var discountCellAddress;
  var promoParticipation;
  var promoParticipationIndent = 10;
  var promoParticipationCellAddress;
  var weeklyPricesAndDiscounts = [];
  var columns = ["B", "C", "D", "E", "F", "G", "H"];

  while (columnNum <= MAX_NUMBER_COLUMNS_FOR_READING) {
    var newPricesAndDiscounts = [];

    for (var i = 0; i < skuNamesAndIds.length; i++) {
      priceCellAddress = columns[columnCount] + priceIndent;
      discountCellAddress = columns[columnCount] + discountIndent;
      promoParticipationCellAddress = columns[columnCount] + promoParticipationIndent;

      price = ws.getCell(priceCellAddress)?.value;
      discount = ws.getCell(discountCellAddress)?.value;
      promoParticipation = ws.getCell(promoParticipationCellAddress)?.value;

      priceIndent += 7;
      discountIndent += 7;
      promoParticipationIndent += 9;

      if (i == skuNamesAndIds.length - 1) {
        priceIndent = 6;
        discountIndent = 7;
        promoParticipationIndent = 10;
      }

      var priceOrDiscountIsValid = checkPriceAndDiscount(price, discount);

      if (!priceOrDiscountIsValid) {
        continue;
      }

      newPricesAndDiscounts.push({
        dayIndex: i,
        nmID: skuNamesAndIds[i].nmID,
        changePriceIfInPromo: promoParticipation !== "нет",
        data: {
          price,
          discount,
          nmID: skuNamesAndIds[i].nmID,
        },
      });
    }

    columnNum++;
    columnCount++;
    weeklyPricesAndDiscounts.push(newPricesAndDiscounts);

    if (columnCount === columns.length) {
      columnCount = 0;
    }
  }

  return { weeklyPricesAndDiscounts };
};

export default readWeeklyPricesFile;
