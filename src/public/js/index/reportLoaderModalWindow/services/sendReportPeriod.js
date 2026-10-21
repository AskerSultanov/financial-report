import doRequest from "../../../utils/doRequest.js";

var url = "/report/";
var requiredTokenType = "read";

var sendReportPeriod = async (
  userId,
  dateFrom,
  dateTo,
  isPeriodWithinSameWeek = false,
  needToLoadAllReports = false,
) => {
  var res = await doRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      dateFrom,
      dateTo,
      isPeriodWithinSameWeek,
      needToLoadAllReports,
      requiredTokenType,
    }),
  });

  var data = await res.json();

  if (data.errorText) {
    alert(data.errorText);
    return;
  }

  if (data.infoText) {
    alert(data.infoText);
    return;
  }

  var { reportData } = data;

  return { reportData };
};

export default sendReportPeriod;
