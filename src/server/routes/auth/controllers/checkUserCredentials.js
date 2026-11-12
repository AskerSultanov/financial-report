import ms from "ms";
import argon2 from "argon2";
import dbUtils from "../../../database/modelsUtil/index.js";
import generageAuthTokens from "../services/utils/generageAuthTokens.js";

var { getUserByLogin } = dbUtils.userModelUtils;

var checkUserCredentialsController = async (req, res) => {
  var { login, passwd } = req.body;

  var user = await getUserByLogin(login);

  if (!user) {
    return res.sendStatus(404);
  }

  var passwdInvalid = !(await argon2.verify(user.passwd, passwd));

  if (passwdInvalid) {
    return res.sendStatus(401);
  }

  var { role, userId } = user;

  var payload = { role, userId };

  var { accessToken, refreshToken } = await generageAuthTokens(payload);

  var accessTokenTTLInMs = ms(process.env.ACCESS_TOKEN_TTL);
  var refreshTokenTTLInMs = ms(process.env.REFRESH_TOKEN_TTL);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: refreshTokenTTLInMs,
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: accessTokenTTLInMs,
  });

  res.cookie("userId", userId, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: accessTokenTTLInMs,
  });

  return res.json({ redirectUrl: "/my" });
};

export default checkUserCredentialsController;
