import createTaxTable from "./taxTable.js";
import getTaxParams from "./getTaxParams.js";
import taxRateHandler from "./taxRateHandler.js";
import handleTaxYearSelection from "./handleTaxYearSelection.js";
import getMainPageButtonHandler from "./getMainPageButtonHandler.js";
import insertTaxYearsToSelectElem from "./insertTaxYearsToSelectElem.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";
import mandatoryInsuranceRateHandler from "./mandatoryInsuranceRateHandler.js";

import writeTaxParamsToLocalStorage from "./writeTaxParamsToLocalStorage.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { taxParams } = await getTaxParams(userId);

  if (!taxParams.length) {
    return;
  }

  var { taxRate, mandatoryInsuranceFeeRate, mandatoryInsuranceFee } = taxParams[0];

  writeTaxParamsToLocalStorage(taxParams);
  document.getElementById("tax-rate").placeholder = "сейчас процент равен " + taxRate;
  document.getElementById("mandatory-insurance-fee").placeholder = "сейчас сумма равна " + mandatoryInsuranceFee + "р.";
  document.getElementById("mandatory-insurance-fee-rate").placeholder = "сейчас процент равен " + mandatoryInsuranceFeeRate;

  createTaxTable(taxParams);

  taxRateHandler(userId);
  mandatoryInsuranceFeeHandler(userId);
  mandatoryInsuranceRateHandler(userId);
  handleTaxYearSelection(taxParams);
  insertTaxYearsToSelectElem(taxParams);

  getMainPageButtonHandler()
};

main();
