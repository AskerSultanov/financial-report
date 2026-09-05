import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showSpinner, hideSpinner } from "./loaderSpinner.js";
import { insertNewReportToTree } from "../../reportTreeBuilder/index.js";
import reportLoadingStatePanelBuilder from "../../reportLoadingStatePanel/index.js";

var isMainPageLoad = false;
var reportLoadState = null;

var createSaveButton = (
  userId,
  modal,
  dateFromInputElem,
  dateToInputElem,
  uploadAllReportsCheckbox,
) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Отправить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var needToLoadAllReports = uploadAllReportsCheckbox.checked;
    console.log({ needToLoadAllReports });
    try {
      if (needToLoadAllReports) {
        await handleAllReportsLoading(userId);
      } else {
        var dateFrom = dateFromInputElem?.value;
        var { validDateFrom, errorText } = checkDateFrom(dateFrom);

        if (errorText) {
          alert(errorText);
          return;
        }

        var dateTo = dateToInputElem?.value;
        var { validDateTo, isPeriodWithinSameWeek, errorText } = checkDateTo(
          dateTo,
          validDateFrom,
        );

        if (errorText) {
          alert(errorText);
          return;
        }

        if (isPeriodWithinSameWeek) {
          handleSameWeekPeriod(userId, validDateFrom, validDateTo);
        } else {
          handleNonSameWeekPeriod(userId, validDateFrom, validDateTo);
        }
      }
    } catch (e) {
      await hideSpinner();
      alert("Произошла ошибка...");
    }
  };

  return button;
};

export default createSaveButton;

async function handleAllReportsLoading(userId) {
  var dateFrom = "";
  var dateTo = "";
  var isPeriodWithinSameWeek = false;

  await sendReportPeriod(
    userId,
    dateFrom,
    dateTo,
    isPeriodWithinSameWeek,
    true,
  );

  setTimeout(
    () =>
      reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad),
    3000,
  );
}

async function handleSameWeekPeriod(userId, dateFrom, dateTo) {
  showSpinner();

  var result = await sendReportPeriod(userId, dateFrom, dateTo, true);

  await hideSpinner();

  if (!result) {
    return;
  }

  var { reportData } = result;

  insertNewReportToTree(reportData);

  var confirmed = confirm("Отчет успешно сохранен.\nПерейти к отчету?");

  if (confirmed) {
    window.location.href = "/report/" + reportData.reportId;
  }
}

async function handleNonSameWeekPeriod(userId, dateFrom, dateTo) {
  await sendReportPeriod(userId, dateFrom, dateTo, false);

  setTimeout(
    () =>
      reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad),
    3000,
  );
}
