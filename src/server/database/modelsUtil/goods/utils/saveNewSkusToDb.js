import { goodsModel } from "../../../models/index.js";

var saveNewSkusToDb = async (userId, newSkus, session) => {
  var sessionOptions = session ? { session } : {};
  var result = await goodsModel.updateOne({ userId }, { $push: { listGoods: { $each: [...newSkus] } } }, { ...sessionOptions });
  return result;
};

export default saveNewSkusToDb;
