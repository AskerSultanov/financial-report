var updateSkuDisableStatus = async (collection, userId, skuName, disabled) => {
  var result = await collection.updateOne({ userId, "listGoods.skuName": skuName }, { $set: { "listGoods.$.disabled": disabled } });

  return result.acknowledged;
};

export default updateSkuDisableStatus;
