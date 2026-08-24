import { userModel } from "../../../models/index.js";

var getUserByUserId = async (userId) => {
  return await userModel.findOne({ userId });
};
export default getUserByUserId;
