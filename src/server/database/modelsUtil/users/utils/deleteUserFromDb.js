import { dbClient } from "../../../index.js";
import * as models from "../../../models/index.js";

var deleteUserFromDb = async (userId) => {
  var session = await dbClient.startSession();

  session.withTransaction(async () => {
    await models.skuModel.deleteMany({ userId }, { session });

    await models.userModel.deleteOne({ userId }, { session });

    await models.tokenModel.deleteOne({ userId }, { session });

    await models.goodsModel.deleteOne({ userId }, { session });

    await models.taxParamModel.deleteOne({ userId }, { session });

    await models.basicReportDataModel.deleteMany({ userId }, { session });

    await models.reportLoadingStateModel.deleteOne({ userId }, { session });

    await models.weeklyPricesAndDiscountsModel.deleteOne(
      { userId },
      { session },
    );
  });
};
export default deleteUserFromDb;
