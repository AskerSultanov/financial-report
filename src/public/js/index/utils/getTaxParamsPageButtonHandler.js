import navigateTo from "../../utils/navigateTo.js";

var urlToTaxParamsPage = "/tax-params/";
var button = document.getElementById("tax-params-page");

var getTaxParamsPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo(urlToTaxParamsPage);
  });
};

export default getTaxParamsPageButtonHandler;
