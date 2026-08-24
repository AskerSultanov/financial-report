var saveWBTokenToDb = async (tokenModel, userId, token, session) => {
  var result = await tokenModel.updateOne(
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
