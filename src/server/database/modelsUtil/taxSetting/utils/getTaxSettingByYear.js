import { taxSettingModel } from "../../../models/index.js";

var getTaxSettingByYear = async (userId, year, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var taxSetting = await taxSettingModel.findOne(
    { userId, year },
    { _id: 0, __v: 0, userId: 0 },
    { ...sessionOptions },
  );

  return { taxSetting: taxSetting?.toObject() };
};

export default getTaxSettingByYear;
