import ms from "ms";
import createUserService from "../services/createUser.js";
import generageAuthTokens from "../../auth/services/utils/generageAuthTokens.js";

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

  var accessTokenTTLInMs = ms(process.env.ACCESS_TOKEN_TTL);
  var refreshTokenTTLInMs = ms(process.env.REFRESH_TOKEN_TTL);

  return res
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenTTLInMs,
    })
    .cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: accessTokenTTLInMs,
    })
    .cookie("userId", userId, { httpOnly: false, maxAge: accessTokenTTLInMs })
    .json({ redirectUrl: "/" });
};

export default createUserController;
