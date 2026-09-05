import saveTokenService from "../services/saveToken.js";

var saveTokenController = async (req, res, next) => {
  var { userId, token, tokenPayload } = req.body;

  var { isEqualToken, tokenDetails } = await saveTokenService(
    userId,
    token,
    tokenPayload,
  );

  if (isEqualToken) {
    return res.sendStatus(409);
  }

  console.log({ tokenDetails });
  res.json({ tokenDetails });

  next();
};

export default saveTokenController;
