import insertDataToTable from "./insertDataToTable.js";
import checkReportInTree from "./checkReportInTree.js";
import sendAbandonedReports from "./sendAbandonedReports.js";
import getReportLoadingState from "./getReportLoadingState.js";
import { insertNewReportToTree } from "../reportTreeBuilder/index.js";
import updateLoadingProgressText from "./updateLoadingProgressText.js";
import { disableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var FIRST_REQUEST_DELAY_MS = 5_000;
var NEXT_REQUEST_DELAY_MS = 30_000;
var nextRequestDelay = async (isFirstRequest) =>
  new Promise((res) => (isFirstRequest ? setTimeout(res, FIRST_REQUEST_DELAY_MS) : setTimeout(res, NEXT_REQUEST_DELAY_MS)));

var delayToAbandonedReportsLoading = async () => new Promise((res) => setTimeout(res, FIRST_REQUEST_DELAY_MS));

var reportsQueueTbodyId = "reports-queue-tbody";
var abandonedReportsTbodyId = "abandoned-reports-tbody";
var retryAbandonedReportsLoadingMsg = "Повторить загрузку отчётов, которые не удалось загрузить";

var refreshReportLoadingStateStatus = async (userId) => {
  var isFirstRequest = true;
  var reportsQueueTbody = document.getElementById(reportsQueueTbodyId);
  var abandonedReportsTbody = document.getElementById(abandonedReportsTbodyId);

  while (true) {
    await nextRequestDelay(isFirstRequest);
    isFirstRequest = false;

    var reportLoadingState = await getReportLoadingState(userId);
    var { reportsQueue, abandonedReports, loadingInProgress, lastLoadedReport, isReportLoadingIsStopped } = reportLoadingState;

    await resetReportsQueueTable();
    await resetAbandonedReportsTable();
    await updateLoadingProgressText(reportLoadingState);

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    if (isReportLoadingIsStopped) {
      break;
    }

    if (lastLoadedReport?.reportId) {
      var reportIsNotInTree = checkReportInTree(lastLoadedReport.reportId);

      if (reportIsNotInTree) {
        insertNewReportToTree(lastLoadedReport);
      }
    }

    if (!loadingInProgress) {
      if (hasAbandonedReports()) {
        var needToResumeLoading = confirm(retryAbandonedReportsLoadingMsg);

        var success = await sendAbandonedReports(userId, needToResumeLoading);

        if (success) {
          if (needToResumeLoading) {
            await delayToAbandonedReportsLoading(
              
            );

            await resetAbandonedReportsTable();
            insertDataToTable(abandonedReports, reportsQueueTbodyId);
          } else {
            await resetReportsQueueTable();
            await resetAbandonedReportsTable();
            disableParentReportLoadingStatePanel();
            break;
          }
        } else {
          var errMsg;

          if (needToResumeLoading) {
            errMsg = "Произошла ошибка при попытке загрузить отчёты. Попробуйте еще раз.";
          } else {
            errMsg = "Произошла ошибка при попытке избавиться от незагруженных отчётов. Попробуйте еще раз.";
          }

          alert(errMsg);
        }
      } else {
        disableParentReportLoadingStatePanel();
        break;
      }
    }
  }

  return true;

  function hasAbandonedReports() {
    return abandonedReportsTbody.hasChildNodes();
  }

  async function resetAbandonedReportsTable() {
    abandonedReportsTbody.innerHTML = "";
  }

  async function resetReportsQueueTable() {
    reportsQueueTbody.innerHTML = "";
  }
};

export default refreshReportLoadingStateStatus;
