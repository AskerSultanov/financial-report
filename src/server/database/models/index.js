import { dbClient } from "../index.js";
import usersSchema from "../schemas/users.js";
import goodsSchema from "../schemas/goods.js";
import tokenSchema from "../schemas/token.js";
import reportsSchema from "../schemas/reports.js";
import taxParamsSchema from "../schemas/taxParams.js";
import reportsTreeSchema from "../schemas/reportsTree.js";
import reportLoadingStatesSchema from "../schemas/reportLoadingState.js";
import weeklyPricesAndDiscountsSchema from "../schemas/weeklyPricesAndDiscounts.js";

var userModel = dbClient.model("User", usersSchema);
var goodsModel = dbClient.model("Goods", goodsSchema);
var tokenModel = dbClient.model("Token", tokenSchema);
var reportModel = dbClient.model("Report", reportsSchema);
var taxParamModel = dbClient.model("Tax_Param", taxParamsSchema);
var reportTreeModel = dbClient.model("Reports_Tree", reportsTreeSchema);
var reportLoadingStateModel = dbClient.model("Report_Loading_State", reportLoadingStatesSchema);
var weeklyPricesAndDiscountsModel = dbClient.model("Weekly_prices_and_discounts", weeklyPricesAndDiscountsSchema);

export { userModel, goodsModel, reportModel, tokenModel, taxParamModel, reportTreeModel, reportLoadingStateModel, weeklyPricesAndDiscountsModel };
