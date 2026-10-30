import doRequest from "../utils/doRequest.js";
import navigateTo from "../utils/navigateTo.js";

var sendAuthData = async (login, passwd) => {
  var res = await doRequest("/auth", {
    method: "POST",
    body: JSON.stringify({ login, passwd }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 404) {
    alert(`Нет пользователя c ником  "${login}"`);
    return;
  }

  if (res.status == 403) {
    alert("Введены неправильные данные");
    return;
  }

  var { redirectUrl } = await res.json();

  navigateTo(redirectUrl);
};

var authFormHandler = () =>
  (document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();

    var login = document.getElementById("login").value;
    var passwd = document.getElementById("passwd").value;

    await sendAuthData(login, passwd);
  });

authFormHandler();
