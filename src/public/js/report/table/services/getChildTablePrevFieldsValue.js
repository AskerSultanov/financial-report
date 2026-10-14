var getChildTablePrevFieldsValue = (year) => {
  var childPrevFinalProfitElemId = "finalProfit-" + year;

  var childPrevFinalProfitElem = document.getElementById(
    childPrevFinalProfitElemId,
  );
  
  var childPrevFinalProfitElemVal = +childPrevFinalProfitElem.textContent;

  return { childTablePrevData: { childPrevFinalProfitElemVal } };
};

export default getChildTablePrevFieldsValue;
