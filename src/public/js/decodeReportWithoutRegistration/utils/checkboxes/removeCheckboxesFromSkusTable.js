var removeCheckboxesFromSkusTable = (year) => {
  var querySelector = `td[sku-checkbox-parent="${year}"]`;

  var allheckboxes = document.querySelectorAll(querySelector);
  allheckboxes.forEach((item) => item?.remove());

  //return skus table scroll max-width;
  var skusTableScrollElemId = "scroll-skus-table-" + year;
  var skusTableScrollElem = document.getElementById(skusTableScrollElemId);
  skusTableScrollElem.style.maxWidth = 1250;
};

export default removeCheckboxesFromSkusTable;
