import doRequest from "../../utils/doRequest.js";
import navigateTo from "../../utils/navigateTo.js";

var confirmMsg = "Выйти из аккаунта?";
var logoutButton = document.getElementById("logout-button");

var logoutButtonHandler = () => {
  logoutButton.addEventListener("click", async () => {
    var confirmed = confirm(confirmMsg);

    if (confirmed) {
      await doRequest("/logout", { method: "POST" });

      navigateTo("/");
    }
  });
};

export default logoutButtonHandler;
