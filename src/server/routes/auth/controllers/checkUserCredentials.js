import ms from "ms";
import validateUser from "../services/validateUser.js";
import generageAuthTokens from "../services/utils/generageAuthTokens.js";

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

  var accessTokenTTLInMs = ms(process.env.ACCESS_TOKEN_TTL);
  var refreshTokenTTLInMs = ms(process.env.REFRESH_TOKEN_TTL);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: refreshTokenTTLInMs,
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: accessTokenTTLInMs,
  });

  res.cookie("userId", userId, { httpOnly: false, maxAge: accessTokenTTLInMs });

  return res.json({ redirectUrl: "/my" });
};

export default checkUserCredentialsController;
