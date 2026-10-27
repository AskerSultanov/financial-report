import doRequest from "./utils/doRequest.js";

var sendReportData = async (dateFrom, dateTo, token) => {
  var res = await doRequest("/decode-report-without-registration/", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, token }),
    headers: { "Content-Type": "application/json" },
  });

  var { report, errorText } = await res.json();

  return { report, errorText };
};

export default sendReportData;
