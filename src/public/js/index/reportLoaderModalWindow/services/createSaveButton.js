import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import navigateTo from "../../../utils/navigateTo.js";
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
  button.className = "modal-btn modal-btn-primary";
  button.textContent = "Отправить";

  button.onclick = async () => {
    var needToLoadAllReports = uploadAllReportsCheckbox.checked;

    try {
      if (needToLoadAllReports) {
        await handleAllReportsLoading(userId);
        document.body.removeChild(modal);
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

        if (new Date(validDateFrom) >= new Date(validDateTo)) {
          alert("Неккоректный период");
          return;
        }

        if (errorText) {
          alert(errorText);
          return;
        }

        if (isPeriodWithinSameWeek) {
          handleSameWeekPeriod(userId, validDateFrom, validDateTo);
        } else {
          handleNonSameWeekPeriod(userId, validDateFrom, validDateTo);
        }

        document.body.removeChild(modal);
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

  reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad);
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
    var url = "/report/" + reportData.reportId;
    navigateTo(url)

  }
}

async function handleNonSameWeekPeriod(userId, dateFrom, dateTo) {
  await sendReportPeriod(userId, dateFrom, dateTo, false);

  reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad);
}
