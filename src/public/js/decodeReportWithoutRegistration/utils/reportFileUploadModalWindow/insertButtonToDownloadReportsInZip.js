import downloadReportsInZip from "./downloadReportsInZip.js";

var tablesContainer = document.getElementById("tables-container");

var insertButtonToDownloadReportsInZip = (zipBuffer) => {
  var button = document.createElement("button");

  button.id = "download-reports-in-zip";
  button.textContent = "Скачать отчеты";
  button.onclick = () => downloadReportsInZip(zipBuffer);

  tablesContainer.before(button);
};

export default insertButtonToDownloadReportsInZip;
