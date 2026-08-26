import { dbClient } from "../../../index.js";
import * as models from "../../../models/index.js";

var defaultReportLoadingState = {
  queueLength: 0,
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingDelayed: false,
  isReportLoadingIsStopped: false,
  loadingStopReason: "",
  reportsQueue: [],
  abandonedReports: [],
  emptyReportPeriods: [],
  lastLoadedReport: {},
};

var resetUserData = async (userId) => {
  var success = true;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await models.reportModel.deleteMany({ userId });
      await models.reportsWithAccountedFinancesModel.deleteMany({ userId }, { session: session });
      await models.taxParamModel.updateOne({ userId }, { $set: { years: [] } }, { session: session });
      await models.goodsModel.updateOne({ userId }, { $set: { listGoods: [] } }, { session: session });
      await models.reportTreeModel.updateOne({ userId }, { $set: { years: [] } }, { session: session });
      await models.weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts: [] } });
      await models.reportLoadingStateModel.updateOne({ userId }, { $set: defaultReportLoadingState }, { session: session });
    });
  } catch (e) {
    console.log(e);
    success = false;
  } finally {
    if (session?.inTransaction()) {
      await session.endSession();
    }
  }

  return { success };
};

export default resetUserData;
