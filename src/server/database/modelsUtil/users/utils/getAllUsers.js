import { userModel } from "../../../models/index.js";

var getAllUsersFromDb = async () => {
  var users = await userModel.find({}, { _id: 0, passwd: 0 });
  return { users };
};

export default getAllUsersFromDb;
