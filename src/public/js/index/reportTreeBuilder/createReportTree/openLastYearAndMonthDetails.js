var lastMonthDetailsIndex = 0;

var openLastYearAndMonthDetails = (year) => {
  var lastYearDetails = document.getElementById(year);

  lastYearDetails.open = true;
  lastYearDetails.hidden = false;

  var monthsContainerId = "months_container_" + year;
  var monthsContainer = document.getElementById(monthsContainerId);

  var lastMonthDetails = monthsContainer.children.item(lastMonthDetailsIndex );

  lastMonthDetails.open = true;
};

export default openLastYearAndMonthDetails;
