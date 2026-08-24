import dbUtils from "../../../database/modelsUtil/index.js";

var resetUserData = async (req, res) => {
  var { success } = await dbUtils.userModelUtils.resetUserData(req.body.userId);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default resetUserData;
