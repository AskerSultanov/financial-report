import * as jose from "jose";
import createUserService from "../services/createUser.js";

var alg = "HS256";
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

export default createUserController;
