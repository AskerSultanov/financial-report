import navigateTo from "../utils/navigateTo.js";
import createTaxTable from "../taxParams/taxTable.js";
import getTaxParams from "../taxParams/getTaxParams.js";
import taxRateHandler from "../taxParams/taxRateHandler.js";
import handleTaxYearSelection from "../taxParams/handleTaxYearSelection.js";
import insertTaxYearsToSelectElem from "../taxParams/insertTaxYearsToSelectElem.js";
import mandatoryInsuranceFeeHandler from "../taxParams/mandatoryInsuranceFeeHandler.js";
import mandatoryInsuranceRateHandler from "../taxParams/mandatoryInsuranceRateHandler.js";

import writeTaxParamsToLocalStorage from "../taxParams/writeTaxParamsToLocalStorage.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("main");

var bootstrapUserTaxParamsPage = async () => {
  var { taxParams } = await getTaxParams(userId);

  if (!taxParams.length) {
    return;
  }

  var { taxRate, mandatoryInsuranceFeeRate, mandatoryInsuranceFee } =
    taxParams[0];

  writeTaxParamsToLocalStorage(taxParams);
  document.getElementById("tax-rate").placeholder =
    "сейчас процент равен " + taxRate;
  document.getElementById("mandatory-insurance-fee").placeholder =
    "сейчас сумма равна " + mandatoryInsuranceFee + "р.";
  document.getElementById("mandatory-insurance-fee-rate").placeholder =
    "сейчас процент равен " + mandatoryInsuranceFeeRate;

  createTaxTable(taxParams);

  taxRateHandler(userId);
  mandatoryInsuranceFeeHandler(userId);
  mandatoryInsuranceRateHandler(userId);
  handleTaxYearSelection(taxParams);
  insertTaxYearsToSelectElem(taxParams);

  btnBackToMainPage.onclick = () => {
    var url = "/admin/user/" + userId;
    navigateTo(url);
  };
};

bootstrapUserTaxParamsPage();
