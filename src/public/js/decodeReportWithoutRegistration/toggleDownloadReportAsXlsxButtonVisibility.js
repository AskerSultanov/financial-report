var button = document.getElementById("download-xlsx-wrapper");

var enableDownloadReportAsXLSXButton = () => {
  button.hidden = false;
};

var disableDownloadReportAsXLSXButton = () => {
  button.hidden = true;
};

export { enableDownloadReportAsXLSXButton, disableDownloadReportAsXLSXButton };
