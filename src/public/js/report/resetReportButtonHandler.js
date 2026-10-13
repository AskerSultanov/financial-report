import { resetSkusTable, resetTotalsTable } from "./table/resetTables.js";

var resetReportButton = document.getElementById("reset-report-button");

var confirmMsg = "Обнулить отчет?";

var resetReportButtonHandler = (
  userId,
  reportId,
  isCrossYearPeriod,
  startYearSkus,
  endYearSkus,
) => {
  resetReportButton.addEventListener("click", async () => {
    var url = "/" + window.location.pathname.split("/")[1] + "/reset/";
    console.log({ url });

    var confirmed = confirm(confirmMsg);

    if (confirmed) {
      var res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId, reportId }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Отчет успешно обнулен");

        if (isCrossYearPeriod) {
          var startYear = startYearSkus[0].year;
          var endYear = endYearSkus[0].year;

          resetSkusTable(startYearSkus, startYear);
          resetSkusTable(endYearSkus, endYear);

          resetTotalsTable();
          resetTotalsTable(startYear);
          resetTotalsTable(endYear);
        } else {
          var year = startYearSkus[0].year;
          resetSkusTable(startYearSkus, year);

          resetTotalsTable();
        }
      } else {
        alert("Не удалось обнулить отчет.\nПопробуйте еще раз.");
      }
    }
  });
};

export default resetReportButtonHandler;
