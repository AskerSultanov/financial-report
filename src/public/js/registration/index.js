import navigateTo from "../utils/navigateTo.js";

var sendRegistationData = async (login, passwd) => {
  var res = await doRequest("/reg/new", {
    method: "POST",
    body: JSON.stringify({ login, passwd }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 400) {
    var { errorText } = await res.json();
    alert(errorText);
    return;
  } else if (res.status == 409) {
    alert(`Пользователь с ником ${login} уже существует`);
    return;
  }

  var { redirectUrl } = await res.json();

  navigateTo(redirectUrl);
};

var registrationFormHandler = () =>
  (document.getElementById("registration-form").onsubmit = async (e) => {
    e.preventDefault();

    var login = document.getElementById("login").value;

    if (!login) {
      alert("Придумайте логин");
      return;
    }

    var passwd = document.getElementById("passwd").value;

    if (!passwd) {
      alert("Придумайте пароль");
      return;
    }

    await sendRegistationData(login, passwd);
  });

registrationFormHandler();
