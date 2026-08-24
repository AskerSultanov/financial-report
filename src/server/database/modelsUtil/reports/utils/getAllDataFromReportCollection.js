import { reportModel } from "../../../models/index.js";

var getAllDataFromReportCollection = async () => {
  var data = await reportModel.find({});

  return data.map((item) => item.toObject());
};

export default getAllDataFromReportCollection;
