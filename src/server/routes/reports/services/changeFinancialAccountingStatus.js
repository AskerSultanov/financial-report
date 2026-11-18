import dbUtils from "../../../database/modelsUtil/index.js";

var { updateReport } = dbUtils.basicReportsDataModelUtils;

var changeFinancialAccountingStatusService = async (data) => {
  var { userId, reportId, newStatus } = data;

  var updatedFields = {};

  if (newStatus) {
    updatedFields.isFinancesAccounted = true;
    updatedFields.financesAccountedAt = new Date();
  } else {
    updatedFields.isFinancesAccounted = false;
  }

  await updateReport(userId, reportId, updatedFields);
};

export default changeFinancialAccountingStatusService;
