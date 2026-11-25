import navigateTo from "../utils/navigateTo.js";
import createRemoveUserButton from "./createRemoveUserButton.js";
import createTdElement from "../report/table/services/createTdElement.js";

var needToOpenNewWindow = false;

var usersTable = (users) => {
  var tableBody = document.getElementById("tbody");

  for (var user of users) {
    var { userId, login, lastLogin, registeredAt } = user;

    lastLogin = new Date(lastLogin).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    registeredAt = new Date(registeredAt).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    var loginTdElement = createTdElement(login);
    var userIdTdElement = createTdElement(userId);
    var lastLoginTdElement = createTdElement(lastLogin);
    var registeredAtTdElem = createTdElement(registeredAt);
    var removeUserButton = createRemoveUserButton(login, userId);
    var removeUserButtonTdElem = createTdElement(removeUserButton);

    var buttonToUser = document.createElement("button");

    var urlToUserPage = "/admin/user/" + userId;

    buttonToUser.textContent = "открыть";
    buttonToUser.onclick = () => navigateTo(urlToUserPage, needToOpenNewWindow);

    var buttonToUserTdElement = createTdElement(buttonToUser);

    var tableRow = document.createElement("tr");
    tableRow.id = userId;

    tableRow.append(
      userIdTdElement,
      loginTdElement,
      lastLoginTdElement,
      registeredAtTdElem,
      buttonToUserTdElement,
      removeUserButtonTdElem,
    );
    tableBody.append(tableRow);
  }
};

export default usersTable;
