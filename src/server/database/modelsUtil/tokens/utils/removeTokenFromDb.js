import { tokenModel } from "../../../models/index.js";

var removeTokenFromDb = async (userId) => await tokenModel.updateOne({ userId }, { $set: { token: "", tokenHasBeenRemoved: true } });

export default removeTokenFromDb;
