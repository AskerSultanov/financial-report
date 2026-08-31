import * as jose from "jose";
import dbUtils from "../../../database/modelsUtil/index.js";
import checkCredentials from "../services/checkCredentials.js";

var alg = "RS256";
var oneDayMs = 86_400_000;
var exp = Date.now() + oneDayMs;

var { getUserByLogin } = dbUtils.userModelUtils;

var checkUserCredentials = async (req, res, next) => {
  var existUser = await getUserByLogin(req.body.login);

  if (!existUser) {
    return res.sendStatus(404);
  }

  var success = await checkCredentials(req.body, existUser);

  if (!success) {
    return res.sendStatus(401);
  }

  var role = existUser.login === process.env.adminName ? "admin" : "user";

  var payload = { role, userId: existUser.userId };
  var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
  var token = await new jose.SignJWT(payload).setExpirationTime(exp).setProtectedHeader({ alg }).sign(privateKey, {});
  var userId = existUser.userId;

  return res
    .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

export default checkUserCredentials;
