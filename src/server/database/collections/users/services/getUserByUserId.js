var getUserByUserId = async (collection, userId) => {
  return await collection.findOne({ userId });
};
export default getUserByUserId;
