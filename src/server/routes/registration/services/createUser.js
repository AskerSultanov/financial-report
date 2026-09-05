import { randomBytes } from "node:crypto";
import checkLogin from "./utils/checkLogin.js";
import checkPasswd from "./utils/checkPasswd.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { createUserToDb, getUserByLogin } = dbUtils.userModelUtils;

var createUserService = async (candidate) => {
  var { loginInvalid, errorText } = checkLogin(candidate.login);

  if (loginInvalid) {
    return { errorText, userIsExist: false, userId: null, role: "" };
  }

  var { pwdInvalid, errorText } = checkPasswd(candidate.passwd);

  if (pwdInvalid) {
    return { errorText, userIsExist: false, userId: null, role: "" };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var userExist = await getUserByLogin(candidate.login, session);

    if (userExist) {
      return { userIsExist: true, mgs: "", userId: null, role: "" };
    }

    var userId = randomBytes(10).toString("hex");

    candidate.userId = userId;
    candidate.role =
      candidate.login === process.env.adminName ? "admin" : "user";

    await createUserToDb(candidate, session);

    return { userId, userIsExist: false, errorText: "", role: candidate.role };
  });
};

export default createUserService;
