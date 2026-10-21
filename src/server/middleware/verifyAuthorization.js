var roles = ["admin", "user"];

var verifyAuthorization = (req, res, next) => {
  var { payload } = req;

  if (roles.includes(payload.role)) {
    return next();
  } else {
    return res.sendStatus(403);
  }
};

export default verifyAuthorization;
