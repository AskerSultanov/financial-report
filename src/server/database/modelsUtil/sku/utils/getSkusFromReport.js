import { skuModel } from "../../../models/index.js";

var getSkusFromReport = async (userId, reportId, skuNames, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var skusFromReport = await skuModel.find(
    { userId, reportId, skuName: { $in: skuNames } },
    {},
    { ...sessionOptions },
  );

  return { skusFromReport };
};

export default getSkusFromReport;
