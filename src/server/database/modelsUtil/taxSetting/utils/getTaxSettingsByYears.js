import { taxSettingModel } from "../../../models/index.js";

var getTaxSettingsByYears = async (userId, session, years = []) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var queryFilter = years?.length
    ? { userId, year: { $in: years } }
    : { userId };

  var taxSettings = await taxSettingModel.find(
    queryFilter,
    { _id: 0, __v: 0, userId: 0 },
    { ...sessionOptions },
  );

  taxSettings.forEach((item) => item.toObject());

  return { taxSettings };
};

export default getTaxSettingsByYears;
