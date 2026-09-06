var sendReportPeriodsToReportLoader = async ({ userId, dateFrom, dateTo, needToLoadAllReports }) => {
  var res = await fetch(process.env.REPORT_LOADER_URL, {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo, needToLoadAllReports }),
    headers: { "content-type": "application/json", Authorization: "Bearer " + process.env.SECRET_KEY },
  });

  return { status: res.status };
};

export default sendReportPeriodsToReportLoader;
