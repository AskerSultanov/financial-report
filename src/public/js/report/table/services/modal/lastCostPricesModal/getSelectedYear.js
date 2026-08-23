var getSelectedYear = () => {
  var yearSelector = document.getElementById("year-selector");

  var selectedYear;

  for (var option of yearSelector.children) {
    if (option.selected) {
      selectedYear = +option.text;
    }
  }

  return { selectedYear };
};

export default getSelectedYear;
