var getUserByUserId = async (userModel, userId) => {
  return await userModel.findOne({ userId });
};
export default getUserByUserId;
