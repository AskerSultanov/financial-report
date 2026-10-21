import doRequest from "../utils/doRequest.js";
import { resetSkusTable, resetTotalsTable } from "./table/resetTables.js";

var resetReportButton = document.getElementById("reset-report-button");

var confirmMsg = "Обнулить отчет?";

var resetReportButtonHandler = (
  userId,
  reportId,
  isCrossYearPeriod,
  skus,
  startYearSkus,
  endYearSkus,
) => {
  resetReportButton.addEventListener("click", async () => {
    var url = "/" + window.location.pathname.split("/")[1] + "/reset/";

    var confirmed = confirm(confirmMsg);

    if (confirmed) {
      var res = await doRequest(url, {
        method: "POST",
        body: JSON.stringify({ userId, reportId }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Отчет успешно обнулен");

        if (isCrossYearPeriod) {
          var startYear = startYearSkus[0]?.year;
          var endYear = endYearSkus[0]?.year;

          resetSkusTable(startYearSkus, startYear);
          resetSkusTable(endYearSkus, endYear);

          resetTotalsTable(skus);
          resetTotalsTable(startYearSkus, startYear);
          resetTotalsTable(endYearSkus, endYear);
        } else {
          var year = skus[0]?.year;
          resetSkusTable(skus, year);

          resetTotalsTable(skus);
        }
      } else {
        alert("Не удалось обнулить отчет.\nПопробуйте еще раз.");
      }
    }
  });
};

export default resetReportButtonHandler;
