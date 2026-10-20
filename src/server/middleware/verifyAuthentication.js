import * as jose from "jose";
import { join } from "node:path";

var verifyAuthentication = async (req, res, next) => {
  var accessToken = req.cookies?.access_token;

  if (!accessToken) {
    return res.sendFile(
      join(
        import.meta.dirname,
        "../../public/html/decodeReportWithoutRegistration/index.html",
      ),
    );
  }

  try {
    var accessTokenSecret = jose.base64url.decode(
      process.env.ACCESS_TOKEN_SECRET,
    );

    var { payload } = await jose.jwtVerify(accessToken, accessTokenSecret);
  } catch (e) {
    res.clearCookie("access_token");
    return res.sendStatus(401);
  }

  req.payload = payload;
  next();
};

export default verifyAuthentication;
