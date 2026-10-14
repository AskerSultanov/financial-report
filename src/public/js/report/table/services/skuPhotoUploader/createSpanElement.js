var createSpanElement = (skuName) => {
  var span = document.createElement("span");

  span.id = "span-" + skuName;
  span.style.display = "none";
  span.textContent = "Загрузить";
  span.setAttribute("skuName", skuName);

  return span;
};

export default createSpanElement;
