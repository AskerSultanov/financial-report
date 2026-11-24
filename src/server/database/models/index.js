import { dbClient } from "../index.js";
import skuSchema from "../schemas/skus.js";
import usersSchema from "../schemas/users.js";
import goodsSchema from "../schemas/goods.js";
import tokenSchema from "../schemas/token.js";
import taxSettingSchema from "../schemas/taxSetting.js";
import basicReportDataSchema from "../schemas/basicReportData.js";
import reportLoadingStateSchema from "../schemas/reportLoadingState.js";
import weeklyPricesAndDiscountsSchema from "../schemas/weeklyPricesAndDiscounts.js";

var skuModel = dbClient.model("Sku", skuSchema);
var userModel = dbClient.model("User", usersSchema);
var goodsModel = dbClient.model("Goods", goodsSchema);
var tokenModel = dbClient.model("Token", tokenSchema);
var taxSettingModel = dbClient.model("Tax_setting", taxSettingSchema);

var reportLoadingStateModel = dbClient.model(
  "Report_Loading_State",
  reportLoadingStateSchema,
);

var basicReportDataModel = dbClient.model(
  "Basic_reports_data",
  basicReportDataSchema,
  "basic_reports_data",
);

var weeklyPricesAndDiscountsModel = dbClient.model(
  "Weekly_prices_and_discounts",
  weeklyPricesAndDiscountsSchema,
);

export {
  skuModel,
  userModel,
  goodsModel,
  tokenModel,
  taxSettingModel,
  basicReportDataModel,
  reportLoadingStateModel,
  weeklyPricesAndDiscountsModel,
};
