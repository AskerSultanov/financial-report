import { dbClient } from "../../../index.js";
import { reportModel, reportsWithAccountedFinancesModel } from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var addReportToAccounted = async (userId, reportId, dateFrom, dateTo) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    await reportModel.updateOne({ userId, reportId }, { isFinancesAccounted: true }, { session: session });

    await reportsWithAccountedFinancesModel.create(
      [
        {
          userId,
          reportId,
          dateFrom,
          dateTo,
          financesAccountedAt: Date.now() + mskTimeOffsetInMs,
        },
      ],
      { session: session },
    );
  });
};

export default addReportToAccounted;
