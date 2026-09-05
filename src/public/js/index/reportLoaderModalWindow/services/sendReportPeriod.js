var url = "/report/";

var sendReportPeriod = async (
  userId,
  dateFrom,
  dateTo,
  isPeriodWithinSameWeek = false,
  needToLoadAllReports = false,
) => {
  var res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      dateFrom,
      dateTo,
      isPeriodWithinSameWeek,
      needToLoadAllReports,
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
