var regExp = /[a-zA-Z0-9]/gi;

var checkLogin = (login) => {
  var errorText = "";
  var loginInvalid = true;

  if (!login) {
    errorText = "Логин не может быть пустым " + login;
    return { errorText, loginInvalid };
  }

  login = login.trim();

  if (login.length < 2) {
    errorText = "Минимальная длина логина равна 2 " + login;
    return { errorText, loginInvalid };
  }

  if (login.length > 20) {
    errorText = "Максимальная длина логина равна 20 " + login;
    return { errorText, loginInvalid };
  }

  var result = login.match(regExp);

  if (result.length !== login.length) {
    errorText =
      "Логин должен содержать только латинские буквы или цифры" + login;
    return { errorText, loginInvalid };
  }

  return { errorText, loginInvalid: false };
};

export default checkLogin;
