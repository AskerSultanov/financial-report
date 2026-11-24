import getTaxSettings from "./getTaxSettings.js";
import taxRateHandler from "./taxRateHandler.js";
import createTaxSettingsTable from "./createTaxSettingsTable.js";
import handleTaxYearSelection from "./handleTaxYearSelection.js";
import insertTaxYearsToSelectElem from "./insertTaxYearsToSelectElem.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";
import mandatoryInsuranceRateHandler from "./mandatoryInsuranceRateHandler.js";

import writeTaxSettingsToLocalStorage from "./writeTaxSettingsToLocalStorage.js";

var bootstrapTaxSettingsPage = async (userId) => {
  var { taxSettings } = await getTaxSettings(userId);

  if (!taxSettings.length) {
    return;
  }

  var { taxRate, mandatoryInsuranceFeeRate, mandatoryInsuranceFee } =
    taxSettings[0];

  writeTaxSettingsToLocalStorage(taxSettings);

  document.getElementById("tax-rate").placeholder =
    "сейчас процент равен " + taxRate;

  document.getElementById("mandatory-insurance-fee").placeholder =
    "сейчас сумма равна " + mandatoryInsuranceFee + "р.";

  document.getElementById("mandatory-insurance-fee-rate").placeholder =
    "сейчас процент равен " + mandatoryInsuranceFeeRate;

  createTaxSettingsTable(taxSettings);

  taxRateHandler(userId);
  mandatoryInsuranceFeeHandler(userId);
  mandatoryInsuranceRateHandler(userId);
  handleTaxYearSelection(taxSettings);
  insertTaxYearsToSelectElem(taxSettings);
};

export default bootstrapTaxSettingsPage;
