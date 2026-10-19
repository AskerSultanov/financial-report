var calcQuantity = (report) => {
  var qty = report
    .filter((item) => item.docTypeName === "Продажа")
    .reduce((acc, i) => acc + +i.quantity, 0);

  return qty;
};

export default calcQuantity;
