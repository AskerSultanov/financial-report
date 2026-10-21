import * as jose from "jose";
import generageAuthTokens from "../services/utils/generageAuthTokens.js";

var oneDayMs = 86_400_000;
var thirtyDaysMs = 2592e6;

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

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: thirtyDaysMs,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: oneDayMs,
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
};

export default refreshTokenController;
