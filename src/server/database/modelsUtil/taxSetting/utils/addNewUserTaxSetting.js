import { taxSettingModel } from "../../../models/index.js";
import defaultTaxSettings from "../../../defaultTaxSettings.js";

var addNewUserTaxSetting = async (userId, year, session) => {
  var taxSetting = await taxSettingModel.findOne(
    { userId, year },
    {},
    { session },
  );

  if (taxSetting) {
    var nextYear = year + 1;

    var nextYearTaxSetting = await taxSettingModel.findOne(
      { userId, year: nextYear },
      {},
      { session },
    );

    if (!nextYearTaxSetting) {
      var nextYearDefaultTaxSettings = defaultTaxSettings.find(
        (item) => item.year === nextYear,
      );

      if (nextYearDefaultTaxSettings) {
        nextYearDefaultTaxSettings.userId = userId;
        await taxSettingModel.insertOne(nextYearDefaultTaxSettings, {
          session,
        });
      }
    }

    return { taxSetting: taxSetting.toObject() };
  }

  taxSetting = defaultTaxSettings.find((item) => item.year === year);

  taxSetting.userId = userId;

  await taxSettingModel.insertOne(taxSetting, { session });

  return { taxSetting };
};

export default addNewUserTaxSetting;
