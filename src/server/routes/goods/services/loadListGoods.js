import { dbClient } from "../../../database/index.js";
import listGoodsLoader from "./utils/listGoodsLoader.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import removeDublicates from "./utils/removeDublicates.js";

var skuNamesStub = [];
var selectedFields = { id: 1, skuName: 1 };

var { saveListGoodsToDb, getListGoodsFromDb } = dbUtils.goodsModelUtils;

var loadListGoodsService = async (data) => {
  var { userId, wbtoken } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { listGoods } = await getListGoodsFromDb(
      userId,
      skuNamesStub,
      selectedFields,
      session,
    );

    var { listGoodsFromWBAPI } = await listGoodsLoader(userId, wbtoken);

    var { dedublicatedListGoods } = removeDublicates(
      listGoods,
      listGoodsFromWBAPI,
    );

    await saveListGoodsToDb(userId, dedublicatedListGoods, session);

    return { listGoods: dedublicatedListGoods, errorText: "" };
  });
};

export default loadListGoodsService;
