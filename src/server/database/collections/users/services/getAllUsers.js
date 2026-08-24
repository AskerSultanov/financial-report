var getAllUsersFromDb = async (userModel) => {
  var users = await userModel.find({}, { _id: 0, passwd: 0 });
  return { users };
};

export default getAllUsersFromDb;
