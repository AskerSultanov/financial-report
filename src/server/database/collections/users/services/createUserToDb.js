import argon2 from "argon2";
import * as models from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var createUserToDb = async (user, session) => {
  var { userId, role, login, passwd } = user;

  var registeredAt = new Date(Date.now() + mskTimeOffsetInMs);
  var hashedPasswd = await argon2.hash(passwd + "", { secret: process.env.SECRET_KEY });

  await models.tokenModel.insertOne({ userId }, session);
  await models.reportModel.insertOne({ userId }, session);
  await models.taxParamModel.insertOne({ userId }, session);
  await models.reportLoadingStateModel.insertOne({ userId }, session);
  await models.goodsModel.insertOne({ userId, listGoods: [] }, session);
  await models.reportTreeModel.insertOne({ userId, years: [] }, session);
  await models.weeklyPricesAndDiscountsModel.insertOne({ userId }, session);
  await models.userModel.insertOne({ login, userId, role, registeredAt, passwd: hashedPasswd }, session);
};

export default createUserToDb;
