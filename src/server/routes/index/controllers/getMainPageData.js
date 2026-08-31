import dbUtils from "../../../database/modelsUtil/index.js";
import sortReportsByAccountingDate from "../services/sortReportsByAccountingDate.js";
import sortReportPeriodsByYearAndMonths from "../services/sortReportPeriodsByYearAndMonths.js";

var projectonFields = ["reports.reportId", "reports.isFinancesAccounted"];

var session = null;

var selectedFieldsToLoadingState = [
  "queueLength",
  "reportsQueue",
  "queueCapacity",
  "abandonedReports",
  "loadingInProgress",
  "loadingStopReason",
  "isReportLoadingIsStopped",
];

var getMainPageData = async (req, res, next) => {
  var userId = req.params.userId;

  var reportLoadingStateUrl = "/report/loading-state/" + userId + "/";

  var { reportPeriods } = await dbUtils.reportPeriodsModelUtils.getReportPeriods(userId);
  var { sortedReportPeriods } = sortReportPeriodsByYearAndMonths(reportPeriods);

  var reportLoadingState = await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(userId, session, selectedFieldsToLoadingState);

  if (!reportPeriods.length) {
    return res.json({
      reportLoadingState,
      reportLoadingStateUrl,
      reportTree: [],
      lastReports: [],
      reportsWithAccountedFinances: [],
    });
  }

  var lastReportIds = sortedReportPeriods[0].months[0].reportIds.map(({ reportId }) => reportId);

  if (!lastReportIds || !lastReportIds.length) {
    return res.json({
      reportLoadingState,
      reportLoadingStateUrl,
      reportTree: [],
      lastReports: [],
      reportsWithAccountedFinances: [],
    });
  }

  var { reports } = await dbUtils.reportModelUtils.getReportsByUserId(userId, session, projectonFields, lastReportIds);

  var { reportsWithAccountedFinances } = await dbUtils.reportsWithAccountedFinancesModelUtils.getReportsWithAccountedFinances(userId);

  return res.json({
    reportLoadingState,
    reportLoadingStateUrl,
    lastReports: reports,
    reportTree: sortedReportPeriods,
    reportsWithAccountedFinances: sortReportsByAccountingDate(reportsWithAccountedFinances),
  });
};

export default getMainPageData;
