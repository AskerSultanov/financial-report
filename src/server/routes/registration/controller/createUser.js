import * as jose from "jose";
import { randomBytes } from "node:crypto";
import checkLogin from "../services/checkLogin.js";
import checkPasswd from "../services/checkPasswd.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";

var alg = "RS256";
var oneDayMs = 24 * 3600 * 1000;

var { createUserToDb, getUserByLogin } = dbUtils.userCollectionServices;

var createUser = async (req, res, next) => {
  var candidate = req.body;

  var { loginIsValid, msg } = checkLogin(candidate.login);

  if (!loginIsValid) {
    return res.status(400).json({ msg });
  }

  var { passwdIsValid, msg } = checkPasswd(candidate.passwd);

  if (!passwdIsValid) {
    return res.status(400).json({ msg });
  }

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      try {
        var userIsExist = await getUserByLogin(candidate.login, session);

        if (userIsExist) {
          return res.sendStatus(409);
        }

        var userId = randomBytes(10).toString("hex");
        candidate.userId = userId;
        candidate.role = candidate.login === process.env.adminName ? "admin" : "user";

        await createUserToDb(candidate, session);

        var payload = { userId, role: candidate.role };
        var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
        var token = await new jose.SignJWT(payload).setExpirationTime("1 day").setProtectedHeader({ alg }).sign(privateKey);

        return res
          .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
          .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
          .json({ redirectUrl: "/" });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "cannot create user" });
      }
    });
  } catch (e) {
    return res.status(500).json({ msg: "cannot create user" });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default createUser;
