import { goodsModel } from "../../../models/index.js";

var deleteListGoods = async (userId, session) => await goodsModel.updateOne({ userId }, { $set: { listGoods: [] } }, { session: session });

export default deleteListGoods;
