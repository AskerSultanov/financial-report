import truncateNum from "../../reportParsing/truncateNum.js";

var calcSellerPayoutAmount = (report) => {
  var sellerPayoutAmount =
    report.filter((i) => i.docTypeName === "Продажа").reduce((acc, i) => acc + +i.forPay, 0) -
    report.filter((i) => i.docTypeName === "Возврат").reduce((acc, i) => acc + +i.forPay, 0);

  return truncateNum(sellerPayoutAmount);
};

export default calcSellerPayoutAmount;
