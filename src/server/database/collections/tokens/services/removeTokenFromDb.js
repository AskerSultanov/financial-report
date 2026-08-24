var removeTokenFromDb = async (tokenModel, userId) => await tokenModel.updateOne({ userId }, { $set: { token: "", tokenHasBeenRemoved: true } });

export default removeTokenFromDb;
