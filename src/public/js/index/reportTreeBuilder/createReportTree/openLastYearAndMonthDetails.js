var openLastYearAndMonthDetails = (year, monthName) => {
  var lastYearDetails = document.getElementById(year);
  lastYearDetails.open = true;

  var lastMonthDetailsId = `reports_container_${year}_${monthName}`;
  var lastMonthDetails = document.getElementById(lastMonthDetailsId);
  lastMonthDetails.open = true;
};

export default openLastYearAndMonthDetails;
