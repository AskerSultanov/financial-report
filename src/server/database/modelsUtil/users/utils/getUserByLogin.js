import { userModel } from "../../../models/index.js";

var getUserByLogin = async (login, session) => await userModel.findOne({ login }, null, session);

export default getUserByLogin;
