import dbUtils from "../../../database/modelsUtil/index.js";
import sortReportsByAccountingDate from "./utils/sortReportsByAccountingDate.js";
import sortReportPeriodsByYearAndMonths from "./utils/sortReportPeriodsByYearAndMonths.js";

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

var { getReportLoadingState } = dbUtils.reportLoadingStateModelUtils;
var { getReportPeriods } = dbUtils.reportPeriodsModelUtils;
var { getReportsWithAccountedFinances } =
  dbUtils.reportsWithAccountedFinancesModelUtils;

var getMainPageDataService = async (userId) => {
  var { reportPeriods } = await getReportPeriods(userId);

  if (!reportPeriods.length) {
    return {
      reportLoadingState,
      reportTree: [],
      reportsWithAccountedFinances: [],
    };
  }

  var { reportsWithAccountedFinances } =
    await getReportsWithAccountedFinances(userId);

  var { sortedReportPeriods } = sortReportPeriodsByYearAndMonths(
    reportPeriods,
    reportsWithAccountedFinances,
  );

  var reportLoadingState = await getReportLoadingState(
    userId,
    session,
    selectedFieldsToLoadingState,
  );

  return {
    reportLoadingState,
    reportTree: sortedReportPeriods,
    reportsWithAccountedFinances: sortReportsByAccountingDate(
      reportsWithAccountedFinances,
    ),
  };
};

export default getMainPageDataService;
