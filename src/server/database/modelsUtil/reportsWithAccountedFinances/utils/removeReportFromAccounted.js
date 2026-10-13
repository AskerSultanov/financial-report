import { dbClient } from "../../../index.js";
import {
  reportModel,
  reportsWithAccountedFinancesModel,
} from "../../../models/index.js";

var removeReportFromAccounted = async (userId, reportId, session) => {
  if (!session) {
    var session = await dbClient.startSession();

    return await session.withTransaction(async () => {
      await reportsWithAccountedFinancesModel.deleteOne(
        { userId, reportId },
        { session: session },
      );
      await reportModel.updateOne(
        { userId, reportId },
        { isFinancesAccounted: false },
        { session: session },
      );
    });
  } else {
    await reportsWithAccountedFinancesModel.deleteOne(
      { userId, reportId },
      { session: session },
    );

    await reportModel.updateOne(
      { userId, reportId },
      { isFinancesAccounted: false },
      { session: session },
    );
  }
};

export default removeReportFromAccounted;
