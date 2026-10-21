import navigateTo from "../../utils/navigateTo.js";

var button = document.getElementById("tax-params-page");

var getTaxParamsPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo('/tax-params/')
});
};

export default getTaxParamsPageButtonHandler;
