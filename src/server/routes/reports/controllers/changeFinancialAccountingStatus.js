import dbUtils from "../../../database/modelsUtil/index.js";

var { addReportToAccounted, removeReportFromAccounted } = dbUtils.reportsWithAccountedFinancesModelUtils;

var changeFinancialAccountingStatus = async (req, res) => {
  var { userId, reportId, dateFrom, dateTo, newStatus } = req.body;

  if (newStatus) {
    await addReportToAccounted(userId, reportId, dateFrom, dateTo);
  } else {
    await removeReportFromAccounted(userId, reportId);
  }

  return res.sendStatus(200);
};

export default changeFinancialAccountingStatus;
