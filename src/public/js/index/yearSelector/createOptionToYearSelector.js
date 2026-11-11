var createOptionToYearSelector = (year) => {
  var optionId = "option_" + year;

  var option = document.getElementById(optionId);

  if (option) {
    return { option, isExist: true };
  }

  var option = document.createElement("option");
  option.value = year;
  option.id = optionId;
  option.textContent = year;

  return { option, isExist: false };
};

export default createOptionToYearSelector;
