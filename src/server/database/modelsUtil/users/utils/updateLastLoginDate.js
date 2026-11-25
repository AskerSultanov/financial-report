import { userModel } from "../../../models/index.js";

var updateLastLoginDate = async (userId) => {
  return await userModel.updateOne({ userId }, { lastLogin: new Date() });
};

export default updateLastLoginDate;
