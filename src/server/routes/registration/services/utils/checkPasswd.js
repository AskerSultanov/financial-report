var checkPasswd = (pwd) => {
  var errorText = "";
  var pwdInvalid = true;

  if (!pwd) {
    errorText = "Пароль не может быть пустым";
    return { errorText, pwdInvalid };
  }

  pwd = pwd.trim();

  var pwdIsEmpty = pwd.length === 0;

  if (pwdIsEmpty) {
    errorText = "Пароль не должен содержать пробелов";
    return { errorText, pwdInvalid };
  }

  if (pwd.length < 4) {
    errorText = "Длина пароля должна быть больше 3";
    return { errorText, pwdInvalid };
  }

  if (pwd.length > 21) {
    errorText = "Длина пароля должна быть меньше 21";
    return { errorText, pwdInvalid };
  }

  return { errorText, pwdInvalid: false };
};

export default checkPasswd;
