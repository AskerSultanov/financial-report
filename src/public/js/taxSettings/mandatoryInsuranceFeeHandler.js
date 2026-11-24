import sendNewTaxSetting from "./sendNewTaxSetting.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";
import updateTaxSettingsFromLocalStorage from "./updateTaxSettingsFromLocalStorage.js";
import getSelectedYearTaxSettingFromLocalStorage from "./getSelectedYearTaxSettingFromLocalStorage.js";

var mandatoryInsuranceFeeHandler = (userId) => {
  var input = document.getElementById("mandatory-insurance-fee");

  var button = document.getElementById("mandatory-insurance-fee-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = getSelectedTaxYear();
    var { selectedYearTaxSettings } =
      getSelectedYearTaxSettingFromLocalStorage(selectedYear);

    var currentMandatoryInsuranceFee =
      selectedYearTaxSettings.mandatoryInsuranceFee;

    var newMandatoryInsuranceFee = +input.value;

    if (
      typeof newMandatoryInsuranceFee === "number" &&
      isNaN(newMandatoryInsuranceFee)
    ) {
      return alert("Введите числовое значение");
    }

    if (newMandatoryInsuranceFee === currentMandatoryInsuranceFee) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newMandatoryInsuranceFee < 0 && newMandatoryInsuranceFee > 1e5) {
      return alert("Недопустимое значение");
    }

    var success = await sendNewTaxSetting(userId, selectedYear, false, {
      mandatoryInsuranceFee: newMandatoryInsuranceFee,
    });

    input.value = "";

    if (success) {
      input.placeholder =
        "сейчас сумма равна " + newMandatoryInsuranceFee + "р.";

      var mandatoryInsuranceFeeTdElement = document.getElementById(
        "mandatoryInsuranceFee-" + selectedYear,
      );

      var { textContent } = mandatoryInsuranceFeeTdElement;
      var paidInsuranceFee = textContent.split("/")[0];
      mandatoryInsuranceFeeTdElement.textContent = `${paidInsuranceFee} / ${newMandatoryInsuranceFee}`;

      updateTaxSettingsFromLocalStorage(
        selectedYear,
        "mandatoryInsuranceFee",
        newMandatoryInsuranceFee,
      );
      return alert("Сумма обязательных страховых взносов установлена");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsuranceFeeHandler;
