var getCheckedSkuCheckboxes = (tbodyID) => {
  var checkboxesAttribute = tbodyID === "enabled-skus-tbody" ? "enbl" : "dsbl";

  var checkedCheckboxes = document.querySelectorAll(
    `input.${checkboxesAttribute}:checked`,
  );
};

export default getCheckedSkuCheckboxes;
