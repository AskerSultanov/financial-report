import { userModel } from "../../models/index.js";

import resetUserData from "./services/resetUserData.js";
import getUserById from "./services/getUserByUserId.js";
import getUserByLogin from "./services/getUserByLogin.js";
import getAllUsersFromDb from "./services/getAllUsers.js";
import createUserToDb from "./services/createUserToDb.js";
import deleteUserFromDb from "./services/deleteUserFromDb.js";
import deleteUsersFromDb from "./services/deleteUsersFromDb.js";

var userCollectionServices = {
  createUserToDb: (user, session) => createUserToDb(user, session),

  getUserByLogin: (login, session) => getUserByLogin(userModel, login, session),

  getUserById: (userId) => getUserById(userModel, userId),

  getAllUsersFromDb: () => getAllUsersFromDb(userModel),

  resetUserData: (userId) => resetUserData(userId),

  deleteUserFromDb: (userId, session) => deleteUserFromDb(userId, session),
  deleteUsersFromDb: (session) => deleteUsersFromDb(session),
};

export default userCollectionServices;
