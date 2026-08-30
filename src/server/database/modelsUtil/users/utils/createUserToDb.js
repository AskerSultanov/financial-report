import argon2 from "argon2";
import * as models from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var createUserToDb = async (user, session) => {
  var { userId, role, login, passwd } = user;

  var registeredAt = new Date(Date.now() + mskTimeOffsetInMs);
  var hashedPasswd = await argon2.hash(passwd + "", process.env.SECRET_KEY);

  await models.tokenModel.create([{ userId }], { session: session });
  await models.taxParamModel.create([{ userId }], { session: session });
  await models.reportLoadingStateModel.create([{ userId }], { session: session });
  await models.goodsModel.create([{ userId, listGoods: [] }], { session: session });
  await models.reportPeriodModel.create([{ userId, reportPeriods: [] }], { session: session });
  await models.weeklyPricesAndDiscountsModel.create([{ userId }], { session: session });
  await models.userModel.create([{ login, userId, role, registeredAt, passwd: hashedPasswd }], { session: session });
};

export default createUserToDb;
