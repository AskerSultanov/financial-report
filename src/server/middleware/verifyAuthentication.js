import * as jose from "jose";

var verifyAuthentication = async (req, res, next) => {
  var accessToken = req.cookies?.access_token;
  var wantsHtml = req.headers.accept?.includes("text/html");

  var deny = () => {
    res.clearCookie("access_token");

    if (wantsHtml) {
      return res.redirect(process.env.REDIRECT_URL);
    }

    return res.sendStatus(401);
  };

  if (!accessToken) {
    return deny();
  }

  try {
    var accessTokenSecret = jose.base64url.decode(
      process.env.ACCESS_TOKEN_SECRET,
    );
    var { payload } = await jose.jwtVerify(accessToken, accessTokenSecret);
    } catch {
    return deny();
  }

  req.payload = payload;
  next();
};

export default verifyAuthentication;
