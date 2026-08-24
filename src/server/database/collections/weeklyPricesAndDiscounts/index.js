import { weeklyPricesAndDiscountsModel } from "../../models/index.js";
import setUploadId from "./services/setUploadId.js";
import getUploadId from "./services/getUploadId.js";
import updatePriceAndDiscount from "./services/updatePriceAndDiscount.js";
import getWeeklyPricesAndDiscounts from "./services/getWeeklyPricesAndDiscounts.js";
import setWeeklyPricesAndDiscounts from "./services/setWeeklyPricesAndDiscounts.js";
import deleteWeeklyPricesAndDiscounts from "./services/deleteWeeklyPricesAndDiscounts.js";
import getAllUserWeeklyPricesAndDiscounts from "./services/getAllUserWeeklyPricesAndDiscounts.js";
import getTodayPricesAndDiscountsByDayIndex from "./services/getTodayPricesAndDiscountsByDayIndex.js";

var weeklyPricesAndDiscountsCollectionServices = {
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsModel),
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsModel, userId),
  getTodayPricesAndDiscountsByDayIndex: (dayIndex) => getTodayPricesAndDiscountsByDayIndex(weeklyPricesAndDiscountsModel, dayIndex),

  updatePriceAndDiscount: (userId, skuId, sku, checkedWeekDays) =>
    updatePriceAndDiscount(weeklyPricesAndDiscountsModel, userId, skuId, sku, checkedWeekDays),

  getUploadId: (userId) => getUploadId(weeklyPricesAndDiscountsModel, userId),
  setUploadId: (userId, uploadId, session) => setUploadId(weeklyPricesAndDiscountsModel, userId, uploadId, session),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts, session) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsModel, userId, weeklyPricesAndDiscounts, session),

  deleteWeeklyPricesAndDiscountsFromDb: (userId) => deleteWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsModel, userId),
};

export default weeklyPricesAndDiscountsCollectionServices;
