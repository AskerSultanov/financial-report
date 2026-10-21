import doRequest from "../utils/doRequest.js";

var createRemoveUserButton = (login, userId) => {
  var button = document.createElement("button");
  button.textContent = "удалить";

  button.addEventListener("click", async () => {
    var confirmed = confirm(`Удалить пользователя ${login} ?`);

    if (confirmed) {
      var res = await doRequest("/admin", {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        var userTableRow = document.getElementById(userId);
        userTableRow.remove();
        alert(`Пользователь ${login} успешно удален!`);
      }
    }
  });

  return button;
};

export default createRemoveUserButton;
