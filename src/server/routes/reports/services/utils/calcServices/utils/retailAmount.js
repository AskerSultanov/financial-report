import truncateNum from "../../reportParsing/truncateNum.js";

var calcRetailAmount = (report) => {
  var retailAmount =
    report.filter((item) => item.docTypeName === "Продажа").reduce((acc, item) => acc + +item.retailAmount, 0) -
    report.filter((item) => item.docTypeName === "Возврат").reduce((acc, item) => acc + +item.retailAmount, 0);

  return truncateNum(retailAmount);
};

export default calcRetailAmount;
