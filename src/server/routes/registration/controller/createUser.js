import createUserService from "../services/createUser.js";
import generageAuthTokens from "../../auth/services/utils/generageAuthTokens.js";

var oneDayMs = 86_400_000;
var thirtyDaysMs = 2592e6;

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

export default createUserController;
