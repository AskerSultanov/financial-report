import checkWBTokenExists from "../utils/checkWBTokenExists.js";
import openReportPeriodModalWindow from "./openReportPeriodModalWindow.js";

var reportLoaderModalWindowHandler = (userId) =>
  (document.getElementById("period-button").onclick = async (e) => {
    e.preventDefault();

    var tokenIsExist = await checkWBTokenExists(userId);

    if (!tokenIsExist) {
      return;
    }

    openReportPeriodModalWindow(userId);
  });

export default reportLoaderModalWindowHandler;
