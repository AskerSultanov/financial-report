var calcReturnAmount = (report) => {
  var returnAmount = report.filter((item) => item.docTypeName === "Возврат").length;

  return returnAmount;
};

export default calcReturnAmount;
