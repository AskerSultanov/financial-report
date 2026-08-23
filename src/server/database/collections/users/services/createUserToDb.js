import argon2 from "argon2";
import {
  userCollection,
  goodsCollection,
  tokenCollection,
  reportCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
} from "../../../connections/index.js";

var mskTimeOffsetInMs = 10_800_000;

var createUserToDb = async (user, session) => {
  var { userId, role, login, passwd } = user;
  var hashedPasswd = await argon2.hash(passwd + "", "youSecretKey");

  await tokenCollection.insertOne({ userId }, session);
  await reportCollection.insertOne({ userId }, session);
  await taxParamsCollection.insertOne({ userId }, session);
  await reportLoadingStatesCollection.insertOne({ userId }, session);
  await goodsCollection.insertOne({ userId, listGoods: [] }, session);
  await reportsTreeCollection.insertOne({ userId, years: [] }, session);
  await weeklyPricesAndDiscountsCollection.insertOne({ userId }, session);
  await userCollection.insertOne({ login, userId, role, passwd: hashedPasswd, registeredAt: new Date(Date.now() + mskTimeOffsetInMs) }, session);
};

export default createUserToDb;
