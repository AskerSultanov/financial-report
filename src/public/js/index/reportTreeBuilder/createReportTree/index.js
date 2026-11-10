import createMonthsDetails from "./createMonthsDetails.js";
import showNoReportsMessage from "./showNoReportsMessage.js";
import openLastYearAndMonthDetails from "./openLastYearAndMonthDetails.js";

var createReportTree = async (userId, reportTree) => {
  if (!reportTree.length) {
    return showNoReportsMessage();
  }

  var yearsContainer = document.getElementById("years_container");

  for (var { year, months } of reportTree) {
    var summary = document.createElement("summary");
    summary.append(year);

    var monthsDetails = createMonthsDetails(userId, months, year);

    var yearDetails = document.createElement("details");
    yearDetails.id = year;

    yearDetails.append(summary, monthsDetails);

    yearsContainer.append(yearDetails);
  }

  var lastYear = reportTree[0].year;
  var lastMonthName = reportTree[0].months[0].month;

  openLastYearAndMonthDetails(lastYear, lastMonthName);
};

export default createReportTree;
