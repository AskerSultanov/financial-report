import { dbClient } from "../index.js";
import skuSchema from "../schemas/skus.js";
import usersSchema from "../schemas/users.js";
import goodsSchema from "../schemas/goods.js";
import tokenSchema from "../schemas/token.js";
import reportsSchema from "../schemas/reports.js";
import taxParamsSchema from "../schemas/taxParams.js";
import reportPeriodSchema from "../schemas/reportPeriods.js";
import basicReportDataSchema from "../schemas/basicReportData.js";
import reportLoadingStateSchema from "../schemas/reportLoadingState.js";
import weeklyPricesAndDiscountsSchema from "../schemas/weeklyPricesAndDiscounts.js";
import reportsWithAccountedFinancesSchema from "../schemas/reportsWithAccountedFinances.js";

var skuModel = dbClient.model("Sku", skuSchema);
var userModel = dbClient.model("User", usersSchema);
var goodsModel = dbClient.model("Goods", goodsSchema);
var tokenModel = dbClient.model("Token", tokenSchema);
var reportModel = dbClient.model("Report", reportsSchema);
var taxParamModel = dbClient.model("Tax_Param", taxParamsSchema);
var reportPeriodModel = dbClient.model("Report_Period", reportPeriodSchema);

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

var reportsWithAccountedFinancesModel = dbClient.model(
  "reports_with_accounted_finances",
  reportsWithAccountedFinancesSchema,
);

export {
  skuModel,
  userModel,
  goodsModel,
  reportModel,
  tokenModel,
  taxParamModel,
  reportPeriodModel,
  basicReportDataModel,
  reportLoadingStateModel,
  weeklyPricesAndDiscountsModel,
  reportsWithAccountedFinancesModel,
};
