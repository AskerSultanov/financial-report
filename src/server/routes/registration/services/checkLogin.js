var checkLogin = (login) => {
  var msg = "";
  var loginIsValid = false;

  if (!login) {
    msg = "Логин не может быть пустым " + login;
    return { msg, loginIsValid };
  }

  login = login.trim();

  if (login.length < 2) {
    msg = "Минимальная длина логина равна 2 " + login;
    return { msg, loginIsValid };
  }

  if (login.length > 20) {
    msg = "Максимальная длина логина равна 20 " + login;
    return { msg, loginIsValid };
  }

  var regExp = /[a-zA-Z0-9]/gi;

  var result = login.match(regExp);

  if (result.length !== login.length) {
    msg = "Логин должен содержать только латинские буквы или цифры" + login;
    return { msg, loginIsValid };
  }

  return { msg, loginIsValid: true };
};

export default checkLogin;
