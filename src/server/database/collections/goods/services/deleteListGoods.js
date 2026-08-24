var deleteListGoods = async (goodsModel, userId, session) =>
  await goodsModel.updateOne({ userId }, { $set: { listGoods: [] } }, { session: session });

export default deleteListGoods;
