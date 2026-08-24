import { reportTreeModel } from "../../../models/index.js";

var deleteReportTreeByUserId = async (userId) => {
  var result = await reportTreeModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );

  return result.modifiedCount;
};

export default deleteReportTreeByUserId;
