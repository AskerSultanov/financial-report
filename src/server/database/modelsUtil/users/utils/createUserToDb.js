import argon2 from "argon2";
import * as models from "../../../models/index.js";

var createUserToDb = async (user, session) => {
  var { userId, role, login, passwd } = user;

  var registeredAt = new Date();
  var hashedPasswd = await argon2.hash(passwd + "", process.env.SECRET_KEY);

  await models.taxParamModel.create([{ userId }], { session });

  await models.reportLoadingStateModel.create([{ userId }], {
    session,
  });

  await models.goodsModel.create([{ userId, listGoods: [] }], {
    session,
  });

  await models.weeklyPricesAndDiscountsModel.create([{ userId }], {
    session,
  });

  await models.userModel.create(
    [{ login, userId, role, registeredAt, passwd: hashedPasswd }],
    { session },
  );
};

export default createUserToDb;
