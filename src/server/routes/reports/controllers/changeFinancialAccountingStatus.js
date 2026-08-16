import dbUtils from "../../../database/collections/index.js";

var { addReportToAccounted, removeReportFromAccounted } = dbUtils.reportCollectionServices;

var changeFinancialAccountingStatus = async (req, res) => {
  var { userId, reportId, newStatus } = req.body;

  if (newStatus) {
    await addReportToAccounted(userId, reportId);
  } else {
    await removeReportFromAccounted(userId, reportId);
  }

  return res.sendStatus(200);
};

export default changeFinancialAccountingStatus;
