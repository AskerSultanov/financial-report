import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import { isMonday } from "../../utils/dateUtils/services/getMondaysOrSundaysOfMonth.js";

var checkDateFrom = (dateFrom) => {
  if (!dateFrom) {
    return { validDateFrom: "", errorText: "Неккоректный период" };
  }

  var dateIncludesDot = dateFrom.split("").includes(".");

  if (!dateIncludesDot) {
    return { validDateFrom: "", errorText: "Неккоректный период" };
  }

  var everyIsNum = dateFrom
    .split(".")
    .map(Number)
    .every((num) => typeof num === "number" && !isNaN(num));

  if (!everyIsNum) {
    return { validDateFrom: "", errorText: "Неккоректный период" };
  }

  var standardizedDateFrom = standardizeDate(dateFrom);

  if (!standardizedDateFrom) {
    return { validDateFrom: "", errorText: "Начало периода введено некорректно" };
  }

  if (isFutureDate(standardizedDateFrom)) {
    return { validDateFrom: "", errorText: "Отчетный период еще не наступил" };
  }

  if (!isMonday(standardizedDateFrom)) {
    return { validDateFrom: "", errorText: "Начало периода не является понедельником" };
  }

  return { validDateFrom: standardizedDateFrom, errorText: "" };
};

export default checkDateFrom;
