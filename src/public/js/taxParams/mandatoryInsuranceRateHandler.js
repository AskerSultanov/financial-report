import sendNewTaxParam from "./sendNewTaxParam.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";
import updateTaxParamsIntoLocalStorage from "./updateTaxParamsIntoLocalStorage.js";
import getSelectedYearTaxParamsFromLocalStorage from "./getSelectedYearTaxParamsFromLocalStorage.js";

var mandatoryInsuranceRateHandler = (userId) => {
  var input = document.getElementById("mandatory-insurance-fee-rate");

  var radioButton = document.getElementById("recalculate-all-reports-mandatory-insurance-fee-rate");

  var button = document.getElementById("mandatory-insurance-fee-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = getSelectedTaxYear();
    var { selectedYearTaxParams } = getSelectedYearTaxParamsFromLocalStorage(selectedYear);

    var currentPercent = selectedYearTaxParams.mandatoryInsuranceFeeRate;
    var reportsNeedRecalculation = radioButton.checked;
    var newPercent = +input.value;

    if (typeof newPercent === "number" && isNaN(newPercent)) {
      return alert("Введите числовое значение");
    }

    if (newPercent === currentPercent) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newPercent <= 0 && newPercent >= 100) {
      return alert("Недопустимое значение");
    }
    var success = await sendNewTaxParam(userId, selectedYear, reportsNeedRecalculation, {
      mandatoryInsuranceFeeRate: newPercent,
    });

    input.value = "";

    if (success) {
      input.placeholder = "сейчас процент равен " + newPercent;
      var mandatoryInsuranceFeeRateTdElement = document.getElementById("mandatoryInsuranceFeeRate-" + selectedYear);
      mandatoryInsuranceFeeRateTdElement.textContent = newPercent;

      updateTaxParamsIntoLocalStorage(selectedYear, "mandatoryInsuranceFeeRate", newPercent);

      return alert("Процент успешно установлен");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsuranceRateHandler;
