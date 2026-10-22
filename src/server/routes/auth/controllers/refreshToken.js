import ms from "ms";
import * as jose from "jose";
import generageAuthTokens from "../services/utils/generageAuthTokens.js";

var refreshTokenController = async (req, res) => {
  var refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    res.clearCookie("access_token");
    return res.sendStatus(401);
  }

  var refreshTokenSecret = jose.base64url.decode(
    process.env.REFRESH_TOKEN_SECRET,
  );

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  try {
    var { payload } = await jose.jwtVerify(refreshToken, refreshTokenSecret);

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

    res.cookie("userId", payload.userId, {
      httpOnly: false,
      maxAge: accessTokenTTLInMs,
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
};

export default refreshTokenController;
