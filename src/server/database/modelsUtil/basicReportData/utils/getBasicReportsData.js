import { basicReportDataModel } from "../../../models/index.js";

var getBasicReportsData = async (userId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var basicReportData = await basicReportDataModel.find(
    { userId },
    { _id: 0, __v: 0, skus: 0 },
    { ...sessionOptions },
  );

  return { basicReportData };
};

export default getBasicReportsData;
