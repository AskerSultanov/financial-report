import { dbClient } from "../../../index.js";
import * as models from "../../../models/index.js";

var deleteUsersFromDb = async (adminUserId) => {
  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    await models.userModel.deleteMany({ role: "user" }, { session });

    await models.tokenModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.goodsModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.skuModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.taxSettingModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.basicReportDataModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.reportLoadingStateModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );

    await models.weeklyPricesAndDiscountsModel.deleteMany(
      { userId: { $ne: adminUserId } },
      { session },
    );
  });
};

export default deleteUsersFromDb;
