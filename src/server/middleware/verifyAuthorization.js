import { join } from "node:path";

var roles = ["admin", "user"];

var verifyAuthorization = (req, res, next) => {
  var { payload } = req;
  var currentTimestamp = Date.now() / 1000;

  if (currentTimestamp >= payload.exp || !payload?.role) {
    res.clearCookie("token");
    return res.sendFile(join(import.meta.dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
  }

  if (roles.includes(payload.role)) {
    req.app.locals.userId = payload.userId;
    return next();
  }

  res.clearCookie("token");
  return res.sendStatus(403);
};

export default verifyAuthorization;
