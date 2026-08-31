import { tokenModel } from "../../../models/index.js";

var removeTokenFromDb = async (userId) => {
  var { token } = await tokenModel.findOneAndUpdate({ userId }, { $set: { token: "", tokenHasBeenRemoved: true } }, { returnDocument: "before" });

  return { removedToken: token };
};

export default removeTokenFromDb;
