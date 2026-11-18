import { skuModel } from "../../../models/index.js";

var updateSkus = async (userId, updatedSkus, session) => {
  var bulkOptions = [];
  for (var sku of updatedSkus) {
    var { reportId, skuName, year, data } = sku;

    bulkOptions.push({
      updateOne: {
        filter: { userId, reportId, skuName, year },
        update: { $set: data },
      },
    });
  }

  return await skuModel.bulkWrite(bulkOptions, { session });
};

export default updateSkus;
