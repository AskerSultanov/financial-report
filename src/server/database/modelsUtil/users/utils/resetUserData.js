import { dbClient } from "../../../index.js";
import * as models from "../../../models/index.js";
import killSessions from "../../../killSessions.js";
import { errorLogger } from "../../../../../logger.js";

var defaultReportLoadingState = {
  queueLength: 0,
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingIsStopped: false,
  loadingStopReason: "",
  reportsQueue: [],
  abandonedReports: [],
  emptyReportPeriods: [],
  lastLoadedReport: {},
};

var resetUserData = async (userId) => {
  var success = true;
  // await killSessions(dbClient)

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await models.skuModel.deleteMany({ userId }, { session: session });

      await models.basicReportDataModel.deleteMany(
        { userId },
        { session: session },
      );

      await models.taxParamModel.updateOne(
        { userId },
        { $set: { years: [] } },
        { session: session },
      );

      await models.goodsModel.updateOne(
        { userId },
        { $set: { listGoods: [] } },
        { session: session },
      );

      await models.weeklyPricesAndDiscountsModel.updateOne(
        { userId },
        { $set: { weeklyPricesAndDiscounts: [] } },
      );

      await models.reportLoadingStateModel.updateOne(
        { userId },
        { $set: defaultReportLoadingState },
        { session: session },
      );
    });
  } catch (err) {
    errorLogger.fatal({ userId, err });
    success = false;
  } finally {
    if (session?.inTransaction()) {
      await session.endSession();
    }
  }

  return { success };
};

export default resetUserData;
