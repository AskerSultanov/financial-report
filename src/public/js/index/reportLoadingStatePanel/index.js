import insertDataToTable from "./insertDataToTable.js";
import getReportLoadingState from "./getReportLoadingState.js";
import updateLoadingProgressText from "./updateLoadingProgressText.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";
import { enableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var builderWasCalled = false;

var reportLoadingStatePanelBuilder = async (userId, reportLoadingState, isMainPageLoad) => {
  if (!builderWasCalled) {
    builderWasCalled = true;

    if (!isMainPageLoad) {
      reportLoadingState = await getReportLoadingState(userId);
    }

    var { reportsQueue, abandonedReports, loadingInProgress } = reportLoadingState;

    if (loadingInProgress) {
      enableParentReportLoadingStatePanel();
      await showReportLoadingStatePanel();
      await updateLoadingProgressText(reportLoadingState);

      var reportsQueueTbodyId = "reports-queue-tbody";
      var abandonedReportsTbodyId = "abandoned-reports-tbody";

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
