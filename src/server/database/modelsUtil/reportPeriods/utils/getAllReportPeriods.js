import { reportPeriodModel } from "../../../models/index.js";

var getAllReportPeriods = async () => {
  var data = await reportPeriodModel.find({});
  return data;
};

export default getAllReportPeriods;
