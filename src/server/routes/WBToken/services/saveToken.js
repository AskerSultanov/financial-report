import { dbClient } from "../../../database/index.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import listGoodsLoader from "../../goods/services/listGoodsLoader.js";
import extractNewSkusFromLIstGoods from "../../goods/services/extractNewSkusFromLIstGoods.js";

var skuNamesStub = [];
var selectedFieldsStub = null;

var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenModelUtils;
var { saveListGoodsToDb, getListGoodsFromDb, saveNewSkusToDb } =
  dbUtils.goodsModelUtils;

var saveTokenService = async (userId, newToken, tokenPayload) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var tokenDetails = null;
    var isEqualToken = false;

    var { token } = await getWBTokenByUserId(userId, session);

    if (newToken === token) {
      isEqualToken = true;
      return { isEqualToken, tokenDetails };
    }

    await saveWBTokenToDb(userId, newToken, session);

    var { listGoods } = await getListGoodsFromDb(
      userId,
      skuNamesStub,
      selectedFieldsStub,
      session,
    );
    var { listGoodsFromWBAPI } = await listGoodsLoader(userId, newToken);

    if (!listGoods.length) {
      await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);
    } else {
      var { newSkus } = extractNewSkusFromLIstGoods(
        listGoodsFromWBAPI,
        listGoods,
      );

      await saveNewSkusToDb(userId, newSkus, session);
    }

    tokenDetails = getTokenDetails(tokenPayload);

    tokenDetails.lastUsed = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    return { isEqualToken, tokenDetails };
  });
};

export default saveTokenService;
