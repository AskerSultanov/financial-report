import validateTokenService from "../services/validateToken.js";

var tokenValidatorController = async (req, res, next) => {
  var { token } = req.body;

  var { tokenIsValid, tokenPayload } = await validateTokenService(token);

  if (!tokenIsValid) {
    return res.sendStatus(400);
  }

  req.body.tokenPayload = tokenPayload;

  next();
};

export default tokenValidatorController;
