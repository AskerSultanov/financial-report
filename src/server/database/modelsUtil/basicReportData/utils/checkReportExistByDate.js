import { basicReportDataModel } from "../../../models/index.js";

var checkReportExistByDate = async (userId, dateFrom, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var data = await basicReportDataModel.findOne(
    { userId, dateFrom },
    {},
    { ...sessionOptions },
  );

  return data;
};

export default checkReportExistByDate;
