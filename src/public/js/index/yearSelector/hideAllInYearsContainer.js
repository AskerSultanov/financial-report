var yearsContainer = document.getElementById("years_container");

var hideAllInYearsContainer = () => {
  for (var yearDetails of yearsContainer.children) {
    yearDetails.hidden = true;
  }
};

export default hideAllInYearsContainer;
