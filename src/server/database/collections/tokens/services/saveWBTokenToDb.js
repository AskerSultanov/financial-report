var saveWBTokenToDb = async (collection, userId, token, session) => {
  var result = await collection.updateOne(
    { userId },
    {
      $set: { token, tokenHasBeenRemoved: false },
    },
    {
      session: session,
    },
  );

  return result.modifiedCount;
};

export default saveWBTokenToDb;
