import dbUtils from "../../../database/modelsUtil/index.js";
import getReportTreeDto from "../services/getReportTreeDto.js";
import sortReportsByAccountingDate from "../services/sortReportsByAccountingDate.js";

var getLastNonEmptyReportIds = (lastYear) => lastYear?.months.find((item) => item?.reportIds.length)?.reportIds.map(({ reportId }) => reportId);

var projectonFields = ["reports.reportId", "reports.isFinancesAccounted"];

var session = null;

var selectedFieldsToLoadingState = [
  "queueLength",
  "reportsQueue",
  "queueCapacity",
  "abandonedReports",
  "loadingInProgress",
  "loadingStopReason",
  "isReportLoadingDelayed",
  "isReportLoadingIsStopped",
];

var getMainPageData = async (req, res, next) => {
  var userId = req.params.userId;

  var reportLoadingStateUrl = "/report/loading-state/" + userId + "/";

  var { reportTree } = await dbUtils.reportsTreeModelUtils.getReportTree(userId, session);
  var reportLoadingState = await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(userId, session, selectedFieldsToLoadingState);

  if (!reportTree.length) {
    return res.json({
      reportLoadingState,
      reportLoadingStateUrl,
      reportTree: [],
      lastReports: [],
      reportsWithAccountedFinances: [],
    });
  }

  var reportTreeDto = await getReportTreeDto(reportTree);

  var lastYear = reportTreeDto[0];
  var lastReportIds = getLastNonEmptyReportIds(lastYear);

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
    reportTree: reportTreeDto,
    reportsWithAccountedFinances: sortReportsByAccountingDate(reportsWithAccountedFinances),
  });
};

export default getMainPageData;
