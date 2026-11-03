import downloadReportsInZip from "./downloadReportsInZip.js";
import { getReportActionsContainer } from "../../getReportControlsContainer.js";

var insertButtonToDownloadReportsInZip = () => {
  var button = document.createElement("button");

  button.id = "download-reports-in-zip";
  button.textContent = "Скачать отчеты";
  button.onclick = () => downloadReportsInZip();

  getReportActionsContainer().append(button);
};

export default insertButtonToDownloadReportsInZip;
