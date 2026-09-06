import truncateNum from "../../reportParsing/truncateNum.js";

var taxableAmountOfReport = (report) => {
  var buybackReportIsExist = report.find((item) => item.reportType !== 1);

  var taxableAmountOfBuybackReport = 0;

  if (buybackReportIsExist) {
    var buybackReport = report.filter((item) => item.reportType !== 1);

    var deliveryCost = buybackReport.reduce((acc, item) => acc + +item.deliveryService, 0);

    var sellerPayoutExcludingReturns = buybackReport
      .filter((item) => item.docTypeName === "Продажа")
      .reduce((acc, item) => acc + (+item.forPay ?? +item.retailAmount), 0);

    taxableAmountOfBuybackReport = sellerPayoutExcludingReturns - deliveryCost;
  }

  var mainReport = report.filter((item) => item.reportType === 1);

  var taxableAmountOfMainReport =
    mainReport.filter((item) => item.docTypeName === "Продажа").reduce((acc, item) => acc + +item.retailAmount, 0) -
    mainReport.filter((item) => item.docTypeName === "Возврат").reduce((acc, item) => acc + +item.retailAmount, 0);

  var taxableAmount = taxableAmountOfMainReport + taxableAmountOfBuybackReport;

  return truncateNum(taxableAmount);
};

export default taxableAmountOfReport;
