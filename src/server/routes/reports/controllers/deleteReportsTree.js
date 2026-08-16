import dbUtils from "../../../database/collections/index.js";

var { deleteReportTreeByUserId } = dbUtils.reportsTreeCollectionServices;

var deleteAllReportingPeriods = async (req, res, next) => {
  var { userId } = req.params;

  var successDelete = await deleteReportTreeByUserId(userId);

  return successDelete ? res.sendStatus(200) : res.sendStatus(304);
};

export default deleteAllReportingPeriods;
