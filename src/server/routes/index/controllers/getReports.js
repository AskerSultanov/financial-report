import dbUtils from "../../../database/modelsUtil/index.js";

var projectonFields = ["reportId", "isFinancesAccounted"];

var { getReportsByUserId } = dbUtils.reportModelUtils;

var getReportsController = async (req, res, next) => {
  var { userId, reportIds } = req.body;

  var { reports } = await getReportsByUserId(userId, null, projectonFields, reportIds);
  return res.json({ reports });
};

export default getReportsController;
