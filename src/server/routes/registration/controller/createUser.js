import * as jose from "jose";
import createUserService from "../services/createUser.js";

var alg = "RS256";
var oneDayMs = 86_400_000;

var createUserController = async (req, res, next) => {
  var candidate = req.body;

  var { errorText, userId, userIsExist, role } =
    await createUserService(candidate);

  if (userIsExist) {
    return res.sendStatus(409);
  }

  if (errorText) {
    return res.status(400).json({ errorText });
  }

  var payload = { userId, role };

  var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);

  var token = await new jose.SignJWT(payload)
    .setExpirationTime("1 day")
    .setProtectedHeader({ alg })
    .sign(privateKey);

  return res
    .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

export default createUserController;
