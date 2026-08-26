var allYearsIsEqual = (years) => {
  var yearsIsEqual = true;

  for (var i = 1; i < years.length; i++) {
    if (years[i - 1] !== years[i]) {
      yearsIsEqual = false;
      break;
    }
  }

  return yearsIsEqual;
};

export default allYearsIsEqual;
