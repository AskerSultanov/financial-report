import dbUtils from "../../../database/collections/index.js";

var { updateSkuDisableStatusToDb } = dbUtils.goodsCollectionServices;

var changeSkuDisableStatus = async (req, res, next) => {
  var { userId, skuName, disableStatus } = req.body;
  var success = await updateSkuDisableStatusToDb(userId, skuName, disableStatus);

  if (!success) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

export default changeSkuDisableStatus;
