import * as jose from "jose";
import { join } from "node:path";

var alg = "RS256";

var verifyAuthentication = async (req, res, next) => {
  var token = req.cookies?.token;

  if (!token) {
    return res.sendFile(join(import.meta.dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
  }

  try {
    var publicKey = await jose.importSPKI(process.env.spki, alg);
    var { payload } = await jose.jwtVerify(token, publicKey);
  } catch (e) {
    res.clearCookie("token");
    return res.sendStatus(401);
  }

  req.payload = payload;
  next();
};

export default verifyAuthentication;
