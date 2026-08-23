import dbUtils from "../../../database/collections/index.js";

var { updateSkuInListGoods } = dbUtils.goodsCollectionServices;

var changeSkuDisableStatus = async (req, res, next) => {
  var { userId, skuName, disableStatus } = req.body;

  var success = await updateSkuInListGoods(userId, skuName, { disabled: disableStatus });

  if (!success) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

export default changeSkuDisableStatus;
