var splitReport = (report) => {
  var startYear = +report.dateFrom.split("-")[0];
  var endYear = +report.dateTo.split("-")[0];

  var startYearReport = [];
  var endYearReport = [];

  for (var sku of report.skus) {
    sku.year === startYear
      ? startYearReport.push(sku)
      : endYearReport.push(sku);
  }

  var splitedReport = [];

  if (startYearReport.length) {
    splitedReport.push({ year: startYear, reportPart: startYearReport });
  }

  if (endYearReport.length) {
    splitedReport.push({ year: endYear, reportPart: endYearReport });
  }

  return { splitedReport };
};

export default splitReport;
