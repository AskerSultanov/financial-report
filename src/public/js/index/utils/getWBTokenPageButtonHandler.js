import navigateTo from "../../utils/navigateTo.js";

var button = document.getElementById("wb-token-page");

var getWBTokenPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo("/wbtoken");
  });
};

export default getWBTokenPageButtonHandler;
