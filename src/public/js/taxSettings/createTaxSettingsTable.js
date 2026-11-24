import createTdElement from "../report/table/services/createTdElement.js";

var createTaxSettingsTable = (taxSettings) => {
  var tbody = document.getElementById("tax-tbody");

  var sortedByYearTaxSettings = taxSettings.sort((a, b) => a.year - b.year);

  for (var taxYear of sortedByYearTaxSettings) {
    var tableRow = document.createElement("tr");

    var {
      year,
      taxRate,
      finalProfit,
      retailAmount,
      paidTaxAmount,
      taxableAmount,
      paidInsuranceFee,
      mandatoryInsuranceFee,
      additionalInsuranceFee,
      mandatoryInsuranceFeeRate,
    } = taxYear;

    var reportPeriodYearTdId = "year-" + year;
    var reportPeriodYearTdId = createTdElement(year, reportPeriodYearTdId);

    var taxRateTdId = "taxRate-" + year;
    var taxRateTd = createTdElement(taxRate, taxRateTdId);

    var insuranceFeeInfoElemId = "mandatoryInsuranceFee-" + year;
    var insuranceFeeInfoContent = `${paidInsuranceFee} / ${mandatoryInsuranceFee}`;
    var insuranceFeeInfoTdElem = createTdElement(
      insuranceFeeInfoContent,
      insuranceFeeInfoElemId,
    );

    var mandatoryInsuranceFeeRateTdId = "mandatoryInsuranceFeeRate-" + year;
    var mandatoryInsuranceFeeRateTd = createTdElement(
      mandatoryInsuranceFeeRate,
      mandatoryInsuranceFeeRateTdId,
    );

    var retailAmountTd = createTdElement(retailAmount);
    var taxableAmountTd = createTdElement(taxableAmount);

    if (paidTaxAmount <= 0) {
      paidTaxAmount = 0;
    }

    var paidTaxAmountTd = createTdElement(paidTaxAmount);

    var additionalInsuranceFeeTd = createTdElement(additionalInsuranceFee);

    var finalProfitTd = createTdElement(finalProfit);

    tableRow.append(
      reportPeriodYearTdId,
      taxRateTd,
      insuranceFeeInfoTdElem,
      mandatoryInsuranceFeeRateTd,
      retailAmountTd,
      taxableAmountTd,
      paidTaxAmountTd,
      additionalInsuranceFeeTd,
      finalProfitTd,
    );
    tbody.append(tableRow);
  }

  var table = document.getElementById("tax-table");

  table.append(tbody);
};

export default createTaxSettingsTable;
