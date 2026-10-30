var deleteEmptyMonth = () => {
  var tableBodies = document.querySelectorAll("tbody");

  var year,
    month,
    monthsForDeletion = [];

  for (var tbody of tableBodies) {
    if (tbody.childNodes.length === 0) {
      year = tbody.id.split("_")[2];
      month = tbody.id.split("_")[4];

      monthsForDeletion.push({ year, month });

      document.getElementById(`reports_container_${year}_${month}`).remove();
    }
  }
};

export default deleteEmptyMonth;
