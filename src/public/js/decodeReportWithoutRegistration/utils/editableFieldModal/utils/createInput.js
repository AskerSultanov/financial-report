var createInput = (className, costPriceDisplayElement) => {
  var input = document.createElement("input");
  input.type = "text";
  input.value = costPriceDisplayElement.textContent;
  input.className = className;

  return input;
};

export default createInput;
