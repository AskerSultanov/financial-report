import navigateTo from "../utils/navigateTo.js";

var mainPageUrl = "/my";
var button = document.getElementById("main");

var getMainPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo(mainPageUrl);
  });
};

export default getMainPageButtonHandler;
