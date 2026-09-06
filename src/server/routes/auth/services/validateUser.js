import argon2 from "argon2";
import dbUtils from "../../../database/modelsUtil/index.js";
import * as prismaServices from "../../../postgres/services/index.js";

var { getUserByLogin } = dbUtils.userModelUtils;

var validateUser = async (login, pwd) => {
  var credentialInvalid = true;

  var user = await getUserByLogin(login);
  var userFromPg = await prismaServices.userModelServices.getUserByLogin(login);

  if (!user && !userFromPg) {
    return { credentialInvalid, userId: null };
  }

  credentialInvalid = !(await argon2.verify(user.passwd, pwd));

  return { credentialInvalid, userId: user.userId };
};

export default validateUser;
