import dbUtils from "../../../database/modelsUtil/index.js";

var { updateSkuInListGoods } = dbUtils.goodsModelUtils;

var changeSkuDisableStatusService = async (data) => {
  var { userId, skuName, disableStatus } = data;

  var success = await updateSkuInListGoods(userId, skuName, {
    disabled: disableStatus,
  });

  return { success };
};

export default changeSkuDisableStatusService;
