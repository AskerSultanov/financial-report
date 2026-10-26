var createTitle = (className, titleContent) => {
  var title = document.createElement("h3");
  title.className = className;
  title.textContent = titleContent;

  return title;
};

export default createTitle;
