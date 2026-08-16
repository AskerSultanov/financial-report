var checkPasswd = (pwd) => {
  var msg = "";
  var passwdIsValid = false;

  if (!pwd) {
    msg = "Пароль не может быть пустым";
    return { msg, passwdIsValid };
  }

  pwd = pwd.trim();

  var pwdIsEmpty = pwd.length === 0;

  if (pwdIsEmpty) {
    msg = "Пароль не должен содержать пробелов";
    return { msg, passwdIsValid };
  }

  if (pwd.length < 4) {
    msg = "Длина пароля должна быть больше 3";
    return { msg, passwdIsValid };
  }

  if (pwd.length > 21) {
    msg = "Длина пароля должна быть меньше 21";
    return { msg, passwdIsValid };
  }

  return { msg, passwdIsValid: true };
};

export default checkPasswd;
