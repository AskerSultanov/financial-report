var getCheckedCheckboxes = (year) => {
  var querySelector = `input[sku-checkbox="${year}"]`;
  var seconaryCheckboxes = document.querySelectorAll(querySelector);

  var checkedCheckboxes = [];

  for (var item of seconaryCheckboxes) {
    if (item.checked) {
      checkedCheckboxes.push(item);
    }
  }

  return { checkedCheckboxes };
};

export default getCheckedCheckboxes;
