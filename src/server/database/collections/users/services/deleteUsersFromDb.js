import * as models from "../../../models/index.js";

var deleteUsersFromDb = async (session) => {
  await models.userModel.deleteMany({}, session);
  await models.tokenModel.deleteMany({}, session);
  await models.reportModel.deleteMany({}, session);
  await models.goodsModel.deleteMany({}, session);
  await models.taxParamModel.deleteMany({}, session);
  await models.reportTreeModel.deleteMany({}, session);
  await models.reportLoadingStateModel.deleteMany({}, session);
  await models.weeklyPricesAndDiscountsModel.deleteMany({}, session);
};

export default deleteUsersFromDb;
