import { goodsModel } from "../../../models/index.js";
import { WBAPIError } from "../../../../customError/index.js";

var saveListGoodsToDb = async (userId, listGoods, session) => {
  try {
    var sessionOpt = session ? { session: session } : {};
    var result = await goodsModel.updateOne({ userId }, { $set: { listGoods } }, { ...sessionOpt });

    return result;
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

export default saveListGoodsToDb;
