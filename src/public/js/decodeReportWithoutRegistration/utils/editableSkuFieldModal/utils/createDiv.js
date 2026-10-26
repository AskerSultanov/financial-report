var createDiv = (className, textContent) => {
  var div = document.createElement("div");
  div.className = className;
  div.textContent = textContent;

  return div;
};

export default createDiv;
