var primaryCheckboxHandler = (year, isChecked) => {
  var querySelector = `input[sku-checkbox="${year}"]`;
  var seconaryCheckboxes = document.querySelectorAll(querySelector);
  seconaryCheckboxes.forEach((item) => (item.checked = isChecked));
};

export default primaryCheckboxHandler;
