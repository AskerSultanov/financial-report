import { dbClient } from "../../../index.js";
import * as models from "../../../models/index.js";

var deleteUserFromDb = async (userId) => {
  var session = await dbClient.startSession();

  session.withTransaction(async () => {
    await models.userModel.deleteOne({ userId }, { session });
    await models.tokenModel.deleteOne({ userId }, { session });
    await models.reportModel.deleteOne({ userId }, { session });
    await models.goodsModel.deleteOne({ userId }, { session });
    await models.taxParamModel.deleteOne({ userId }, { session });
    await models.reportPeriodModel.deleteOne({ userId }, { session });
    await models.reportLoadingStateModel.deleteOne({ userId }, { session });
    await models.weeklyPricesAndDiscountsModel.deleteOne(
      { userId },
      { session },
    );
  });
};
export default deleteUserFromDb;
