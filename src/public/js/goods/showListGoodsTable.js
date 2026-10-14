import getGoodsData from "./utils/getGoodsData.js";
import createSkusTable from "./utils/createSkusTableNew.js";
import getCurrentDayMSK from "./utils/getCurrentDayMSK.js";
import switchToActiveTable from "./utils/switchToActiveTable.js";
import getCheckedSkuCheckboxes from "./utils/getCheckedSkuCheckboxes.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import multipleDisableHandling from "./utils/multipleDisableHandling.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import setWeekDaySelectorToCurrentDay from "./utils/setWeekDaySelectorToCurrentDay.js";
import addTableHeadRowToCheckboxForParticipationInPromo from "./utils/addTableHeadRowToCheckboxForParticipationInPromo.js";
import {
  toggleTableScrollVisibillity,
  toggleSkuTableVisibillity,
  toggleWeekDaysSelectorVisibility,
  toggleUploadListGoodsButtonVisibility,
  toggleSkusMetricsFileUploadButtonVisibility,
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility,
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility,
} from "./utils/visibilityToggle/index.js";

var enabledCountElem = document.getElementById("enabled-count");
var disabledCountElem = document.getElementById("disabled-count");

var { currentDayName, currentDayIndex } = getCurrentDayMSK();

var showListGoodsTable = async (userId) => {
  var { listGoods, weeklyPricesAndDiscounts } = await getGoodsData(userId);
  var { enabledSku, disabledSku } = listGoods;

  switchToActiveTable(enabledSku, disabledSku);
  enabledCountElem.textContent = enabledSku.length;
  disabledCountElem.textContent = disabledSku.length

  if (!enabledSku.length && !disabledSku.length) {
    handleEmptySkus(userId);
    return;
  }

  if (!enabledSku.length && disabledSku.length) {
    handleEmptyEnabledSkus(disabledSku);
    return;
  }

  if (weeklyPricesAndDiscounts.length) {
    handleNonEmptyWeeklyPricesAndDiscounts(listGoods, weeklyPricesAndDiscounts);
    return;
  }

  handleNonEmptyEnabledSkus(listGoods);
};

export default showListGoodsTable;

var handleEmptySkus = function (userId) {
  toggleUploadListGoodsButtonVisibility("enable");
  loadListGoodsButtonHandler(userId);

  toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
  toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
};

var handleEmptyEnabledSkus = function (disabledSku) {
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
  toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");

  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
  createSkusTable(disabledSku, "disabled-skus-tbody");
};

var handleNonEmptyEnabledSkus = function ({ enabledSku, disabledSku }) {
  setWeekDaySelectorToCurrentDay(currentDayName);

  toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");

  createSkusTable(enabledSku, "enabled-skus-tbody");

  if (disabledSku.length) {
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");

    createSkusTable(disabledSku, "disabled-skus-tbody");
  } else {
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
  }
};

var handleNonEmptyWeeklyPricesAndDiscounts = function (
  { enabledSku, disabledSku },
  weeklyPricesAndDiscounts,
) {
  toggleWeekDaysSelectorVisibility("enable");
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  setWeekDaySelectorToCurrentDay(currentDayName);
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  // addTableHeadRowToCheckboxForParticipationInPromo();
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");

  var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

  createSkusTable(enabledSku, "enabled-skus-tbody", currentDayData);
  weekDaySelectorHandler(enabledSku, weeklyPricesAndDiscounts, currentDayIndex);

  if (disabledSku.length) {
    createSkusTable(disabledSku, "disabled-skus-tbody", currentDayData);
  }
};
