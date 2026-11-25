import { userModel } from "../../../models/index.js";

var getAllUsersFromDb = async () => {
  var users = await userModel.find(
    { role: "user" },
    { _id: 0, __v: 0, passwd: 0 },
    { readPreference: "secondaryPreferred" },
  );

  users.forEach((user) => user.toObject());

  return { users };
};

export default getAllUsersFromDb;
