import sendNewTaxSetting from "./sendNewTaxSetting.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";
import updateTaxSettingsFromLocalStorage from "./updateTaxSettingsFromLocalStorage.js";
import getSelectedYearTaxSettingFromLocalStorage from "./getSelectedYearTaxSettingFromLocalStorage.js";

var mandatoryInsuranceRateHandler = (userId) => {
  var input = document.getElementById("mandatory-insurance-fee-rate");

  var radioButton = document.getElementById(
    "recalculate-all-reports-mandatory-insurance-fee-rate",
  );

  var button = document.getElementById("mandatory-insurance-fee-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = getSelectedTaxYear();
    var { selectedYearTaxSettings } =
      getSelectedYearTaxSettingFromLocalStorage(selectedYear);

    var currentPercent = selectedYearTaxSettings.mandatoryInsuranceFeeRate;
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
    var success = await sendNewTaxSetting(
      userId,
      selectedYear,
      reportsNeedRecalculation,
      {
        mandatoryInsuranceFeeRate: newPercent,
      },
    );

    input.value = "";

    if (success) {
      input.placeholder = "сейчас процент равен " + newPercent;
      var mandatoryInsuranceFeeRateTdElement = document.getElementById(
        "mandatoryInsuranceFeeRate-" + selectedYear,
      );
      mandatoryInsuranceFeeRateTdElement.textContent = newPercent;

      updateTaxSettingsFromLocalStorage(
        selectedYear,
        "mandatoryInsuranceFeeRate",
        newPercent,
      );

      return alert("Процент успешно установлен");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsuranceRateHandler;
