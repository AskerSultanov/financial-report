var getYearsFromChildTables = () => {
  var years = [];

  var tableBodies = document.querySelectorAll("tbody[year]");

  for (var tbody of tableBodies) {
    var year = tbody.getAttribute("year");
    years.push(year);
  }

  return { years };
};

export default getYearsFromChildTables;
