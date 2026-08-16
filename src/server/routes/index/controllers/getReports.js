import dbUtils from "../../../database/collections/index.js";

var projectonFields = [
  "reports.reportId",
  "reports.totalTaxAmount",
  "reports.totalFinalProfit",
  "reports.totalProductCosts",
  "reports.isFinancesAccounted",
];

var { getReportsByUserId } = dbUtils.reportCollectionServices;

var getReports = async (req, res, next) => {
  var { userId, reportIds } = req.body;

  var { reports } = await getReportsByUserId(userId, null, projectonFields, reportIds);

  return res.json({ reports });
};

export default getReports;
