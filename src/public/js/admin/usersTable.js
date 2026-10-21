import navigateTo from "../utils/navigateTo.js";
import createRemoveUserButton from "./createRemoveUserButton.js";
import createTdElement from "../report/table/services/createTdElement.js";

var usersTable = (users) => {
  var tableBody = document.getElementById("tbody");

  for (var user of users) {
    if (user.role !== "admin") {
      var { userId, login, registeredAt } = user;

      var loginTdElement = createTdElement(login);
      var userIdTdElement = createTdElement(userId);
      var registeredAtTdElem = createTdElement(registeredAt);
      var removeUserButton = createRemoveUserButton(login, userId);
      var removeUserButtonTdElem = createTdElement(removeUserButton);

      var buttonToUser = document.createElement("button");

      var urlToUserPage = "/admin/user/" + userId;

      buttonToUser.textContent = "открыть";
      buttonToUser.onclick = () => navigateTo(urlToUserPage);

      var tableRow = document.createElement("tr");
      tableRow.id = userId;

      tableRow.append(
        userIdTdElement,
        loginTdElement,
        registeredAtTdElem,
        buttonToUser,
        removeUserButtonTdElem,
      );
      tableBody.append(tableRow);
    }
  }
};

export default usersTable;
