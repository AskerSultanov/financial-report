import validateUser from "../services/validateUser.js";
import generageAuthTokens from "../services/utils/generageAuthTokens.js";

var oneDayMs = 86_400_000;
var thirtyDaysMs = 2592e6;

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

  var { accessToken, refreshToken } = await generageAuthTokens(payload);

  return res
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: thirtyDaysMs,
    })
    .cookie("access_token", accessToken, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

export default checkUserCredentialsController;
