import getTokenDataService from "../services/getTokenData.js";

var getTokenDataController = async (req, res, next) => {
  var { userId } = req.params;

  var { tokenIsExist, tokenDetails } = await getTokenDataService(userId);

  return res.json({ tokenIsExist, tokenDetails });
};

export default getTokenDataController;
