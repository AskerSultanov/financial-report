var button = document.getElementById("download-report-as-xlsx-button");

var enableDownloadReportAsXLSXButton = () => (button.hidden = false);

var disableDownloadReportAsXLSXButton = () => (button.hidden = true);

export { enableDownloadReportAsXLSXButton, disableDownloadReportAsXLSXButton };
