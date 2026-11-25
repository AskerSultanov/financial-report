import navigateTo from "../utils/navigateTo.js";
import createRemoveUserButton from "./createRemoveUserButton.js";
import createTdElement from "../report/table/services/createTdElement.js";

var localizeTheDate = (dateInStr) => {
  if (dateInStr) {
    return new Date(dateInStr).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
  }

  return "-";
};

var createUsersTable = (users) => {
  var tableBody = document.getElementById("tbody");

  for (var user of users) {
    var { userId, login, lastLogin, registeredAt } = user;

    lastLogin = localizeTheDate(lastLogin);
    registeredAt = localizeTheDate(registeredAt);

    var loginTdElement = createTdElement(login);
    var userIdTdElement = createTdElement(userId);
    var lastLoginTdElement = createTdElement(lastLogin);
    var registeredAtTdElem = createTdElement(registeredAt);
    var removeUserButton = createRemoveUserButton(login, userId);
    var removeUserButtonTdElem = createTdElement(removeUserButton);

    var buttonToUser = document.createElement("button");

    var urlToUserPage = "/admin/user/" + userId;

    buttonToUser.textContent = "открыть";
    buttonToUser.onclick = () => navigateTo(urlToUserPage);

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

export default createUsersTable;
