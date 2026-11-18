import { reportsWithAccountedFinancesModel } from "../../../models/index.js";

var getAllReportsWithAccountedFinances = async () => {
  var allReportsWithAccounted = await reportsWithAccountedFinancesModel.find(
    {},
  );

  return allReportsWithAccounted;
};

export default getAllReportsWithAccountedFinances;
