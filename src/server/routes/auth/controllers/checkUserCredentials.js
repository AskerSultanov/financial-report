import * as jose from "jose";
import validateUser from "../services/validateUser.js";

var alg = "HS256";
var oneDayMs = 86_400_000;

var checkUserCredentialsController = async (req, res) => {
  var { login, passwd } = req.body;
  var { credentialInvalid, userNotExist, userId } = await validateUser(
    login,
    passwd,
  );

  if (userNotExist) {
    return res.sendStatus(401);
  }

  if (credentialInvalid) {
    return res.sendStatus(401);
  }

  var role = login === process.env.adminName ? "admin" : "user";

  var payload = { role, userId };

  var accessTokenSecret = jose.base64url.decode(
    process.env.ACCESS_TOKEN_SECRET,
  );

  var accessToken = await new jose.SignJWT(payload)
    .setExpirationTime("1d")
    .setProtectedHeader({ alg })
    .sign(accessTokenSecret);

  return res
    .cookie("access_token", accessToken, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

export default checkUserCredentialsController;
