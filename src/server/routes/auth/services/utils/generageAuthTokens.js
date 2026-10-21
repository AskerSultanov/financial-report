import * as jose from "jose";

var alg = "HS256";

var generageAuthTokens = async (payload) => {
  var accessTokenSecret = jose.base64url.decode(
    process.env.ACCESS_TOKEN_SECRET,
  );

  var refreshTokenSecret = jose.base64url.decode(
    process.env.REFRESH_TOKEN_SECRET,
  );

  var refreshToken = await new jose.SignJWT(payload)
    .setExpirationTime("30d")
    .setProtectedHeader({ alg })
    .sign(refreshTokenSecret);

  var accessToken = await new jose.SignJWT(payload)
    .setExpirationTime("1d")
    .setProtectedHeader({ alg })
    .sign(accessTokenSecret);

  return { refreshToken, accessToken };
};

export default generageAuthTokens;
