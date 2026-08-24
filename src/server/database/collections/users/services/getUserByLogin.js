var getUserByLogin = async (userModel, login, session) => await userModel.findOne({ login }, null, session);

export default getUserByLogin;
