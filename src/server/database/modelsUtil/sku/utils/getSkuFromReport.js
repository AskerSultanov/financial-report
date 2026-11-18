import { skuModel } from "../../../models/index.js";

var getSkuFromReport = async (userId, reportId, skuName, year, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var skuFromReport = await skuModel.findOne(
    { userId, reportId, skuName, year },
    {},
    { ...sessionOptions },
  );

  return { skuFromReport };
};

export default getSkuFromReport;
