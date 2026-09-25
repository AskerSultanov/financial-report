import insertDataToTable from "./insertDataToTable.js";
import getReportLoadingState from "./getReportLoadingState.js";
import updateLoadingProgressText from "./updateLoadingProgressText.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";
import { enableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var nextRequestDelay = 5000;
var builderWasCalled = false;
var reportsQueueTbodyId = "reports-queue-tbody";
var abandonedReportsTbodyId = "abandoned-reports-tbody";

var reportLoadingStatePanelBuilder = async (
  userId,
  reportLoadingState,
  isMainPageLoad,
) => {
  if (!builderWasCalled) {
    builderWasCalled = true;

    if (!isMainPageLoad) {
      await new Promise((resolve) => {
        var timerId = setInterval(async () => {
          reportLoadingState = await getReportLoadingState(userId);

          if (reportLoadingState.loadingInProgress) {
            clearInterval(timerId);
            resolve();
          }
        }, nextRequestDelay);
      });
    }

    if (reportLoadingState.loadingInProgress) {
      var { reportsQueue, abandonedReports } = reportLoadingState;

      enableParentReportLoadingStatePanel();
      await showReportLoadingStatePanel();
      await updateLoadingProgressText(reportLoadingState);

      insertDataToTable(reportsQueue, reportsQueueTbodyId);
      insertDataToTable(abandonedReports, abandonedReportsTbodyId);

      var loadingCompleted = await refreshReportLoadingStateStatus(userId);

      if (loadingCompleted) {
        builderWasCalled = false;
      }
    }

    builderWasCalled = false;
  }
};

export default reportLoadingStatePanelBuilder;
