var insertTaxYearsToSelectElem = (years) => {
  var selects = document.getElementById("tax-year");

  for (var { year } of years) {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;

    selects.append(option);
  }
};

export default insertTaxYearsToSelectElem;
