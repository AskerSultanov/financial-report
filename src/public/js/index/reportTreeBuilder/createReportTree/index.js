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
    yearDetails.hidden = true;

    yearDetails.append(summary, monthsDetails);

    yearsContainer.append(yearDetails);
  }

  var lastYear = reportTree[0].year;

  openLastYearAndMonthDetails(lastYear);
};

export default createReportTree;
