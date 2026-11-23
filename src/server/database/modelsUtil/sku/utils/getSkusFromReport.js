import { skuModel } from "../../../models/index.js";

var getSkusFromReport = async (userId, reportId, skuNames, year, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var skusFromReport = await skuModel.find(
    { userId, reportId, year, skuName: { $in: skuNames } },
    {},
    { ...sessionOptions },
  );

  return { skusFromReport };
};

export default getSkusFromReport;
