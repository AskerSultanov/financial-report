import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import getDateToByDateFrom from "../../utils/dateUtils/index.js";

var checkDateTo = (dateTo, dateFrom) => {
  var expectedDateTo = getDateToByDateFrom(dateFrom);

  if (!dateTo) {
    if (isFutureDate(expectedDateTo)) {
      return { validDateFrom: "", isPeriodWithinSameWeek: false, errorText: "Отчетный период еще не наступил" };
    }

    return { validDateTo: expectedDateTo, isPeriodWithinSameWeek: true, errorText: "" };
  }

  var dateIncludesDot = dateTo.split("").includes(".");

  if (!dateIncludesDot) {
    return { validDateTo: "", isPeriodWithinSameWeek: true, errorText: "Неккоректный период" };
  }

  var everyIsNum = dateTo
    .split(".")
    .map(Number)
    .every((num) => typeof num === "number" && !isNaN(num));

  if (!everyIsNum) {
    return { validDateTo: "", isPeriodWithinSameWeek: true, errorText: "Неккоректный период" };
  }

  dateTo = standardizeDate(dateTo);

  if (isFutureDate(dateTo)) {
    return { validDateFrom: "", isPeriodWithinSameWeek: false, errorText: "Отчетный период еще не наступил" };
  }

  if (dateTo === expectedDateTo) {
    return { validDateTo: expectedDateTo, isPeriodWithinSameWeek: true, errorText: "" };
  }

  return { validDateTo: dateTo, isPeriodWithinSameWeek: false, errorText: "" };
};

export default checkDateTo;
