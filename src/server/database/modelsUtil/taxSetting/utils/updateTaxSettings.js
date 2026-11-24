import { taxSettingModel } from "../../../models/index.js";

var updateTaxSettings = async (userId, updatedTaxSettings, session) => {
  var bulkOptions = [];

  for (var { year, data } of updatedTaxSettings) {
    bulkOptions.push({
      updateOne: {
        filter: { userId, year },
        update: { $set: data },
      },
    });
  }

  return await taxSettingModel.bulkWrite(bulkOptions, { session });
};

export default updateTaxSettings;
