import { reportsWithAccountedFinancesModel } from "../../../models/index.js";

var getReportsWithAccountedFinances = async (userId) => {
  var data = await reportsWithAccountedFinancesModel.find({ userId }).lean();

  data.forEach((item) => {
    item.financesAccountedAt = new Date(item.financesAccountedAt).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
  });

  return { reportsWithAccountedFinances: data };
};

export default getReportsWithAccountedFinances;
