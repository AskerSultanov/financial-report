import navigateTo from "../../utils/navigateTo.js";

var urlToTaxSEePage = "/tax-settings/";
var button = document.getElementById("tax-settings-page");

var getTaxSettingsPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo(urlToTaxSEePage);
  });
};

export default getTaxSettingsPageButtonHandler;
