import navigateTo from "../../utils/navigateTo.js";

var enableButtonToAdminPanel = () => {
  var button = document.createElement("button");
  var topActionsContainer = document.getElementById("top-actions");

  button.id = "admin-panel";
  button.textContent = "Панель Админа";

  button.addEventListener("click", () => {
    navigateTo("/admin");
  });

  topActionsContainer.append(button);
};

export default enableButtonToAdminPanel;
