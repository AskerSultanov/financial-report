import dbUtils from "../../../database/modelsUtil/index.js";

var { addReportToAccounted, removeReportFromAccounted } =
  dbUtils.reportsWithAccountedFinancesModelUtils;

var changeFinancialAccountingStatusService = async (data) => {
  var { userId, reportId, dateFrom, dateTo, newStatus } = data;

  if (newStatus) {
    await addReportToAccounted(userId, reportId, dateFrom, dateTo);
  } else {
    await removeReportFromAccounted(userId, reportId);
  }
};

export default changeFinancialAccountingStatusService;
