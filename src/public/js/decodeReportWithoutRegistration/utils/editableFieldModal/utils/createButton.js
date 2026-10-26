var createButton = (className, textContent, { event, cb }) => {
  var btn = document.createElement("button");
  btn.className = className;
  btn.textContent = textContent;

  btn.addEventListener(event, cb);

  return btn;
};

export default createButton;
