import { reportsWithAccountedFinancesModel } from "../../../models/index.js";

var getReportsWithAccountedFinances = async (userId) => {
  var data = await reportsWithAccountedFinancesModel.find({ userId });
  return { reportsWithAccountedFinances: data };
};

export default getReportsWithAccountedFinances;
