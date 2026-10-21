import navigateTo from "../utils/navigateTo.js";

var button = document.getElementById("main");

var getMainPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo("/");
  });
};

export default getMainPageButtonHandler;
