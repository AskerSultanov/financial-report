import argon2 from "argon2";
import dbUtils from "../../../database/modelsUtil/index.js";

var { getUserByLogin } = dbUtils.userModelUtils;

var validateUser = async (login, pwd) => {
  var credentialInvalid = true;

  var user = await getUserByLogin(login);

  if (!user) {
    return { credentialInvalid, userId: null };
  }

  credentialInvalid = await argon2.verify(user.passwd, pwd);

  return { credentialInvalid: false, userId: user.userId };
};

export default validateUser;
