import * as models from "../../../models/index.js";

var deleteUserFromDb = async (userId, session) => {
  await models.userModel.deleteOne({ userId }, session);
  await models.tokenModel.deleteOne({ userId }, session);
  await models.reportModel.deleteOne({ userId }, session);
  await models.goodsModel.deleteOne({ userId }, session);
  await models.taxParamModel.deleteOne({ userId }, session);
  await models.reportTreeModel.deleteOne({ userId }, session);
  await models.reportLoadingStateModel.deleteOne({ userId }, session);
  await models.weeklyPricesAndDiscountsModel.deleteOne({ userId }, session);
};
export default deleteUserFromDb;
