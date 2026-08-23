var saveNewSkusToDb = async (collection, userId, newSkus, session) => {
  var sessionOptions = session ? { session } : {};
  var result = await collection.updateOne({ userId }, { $push: { listGoods: { $each: [...newSkus] } } }, { ...sessionOptions });
  return result;
};

export default saveNewSkusToDb;
