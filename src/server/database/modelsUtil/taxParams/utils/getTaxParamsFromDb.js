import { taxParamModel } from "../../../models/index.js";

var getTaxParamsFromDb = async (userId, year, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var data = await taxParamModel.findOne({ userId }, null, { ...sessionOptions });

  if (year) {
    return data.years.find((date) => date.year == year).toObject();
  }

  return data.toObject().years;
};

export default getTaxParamsFromDb;
