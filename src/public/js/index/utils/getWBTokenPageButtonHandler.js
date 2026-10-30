import navigateTo from "../../utils/navigateTo.js";

var urlToWbTokenPage = "/wbtoken";
var button = document.getElementById("wb-token-page");

var getWBTokenPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo(urlToWbTokenPage);
  });
};

export default getWBTokenPageButtonHandler;
