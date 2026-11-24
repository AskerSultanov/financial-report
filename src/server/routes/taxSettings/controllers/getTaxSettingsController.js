import dbUtils from "../../../database/modelsUtil/index.js";
import excludeFutureTaxSetting from "../services/utils/excludeFutureTaxSetting.js";

var { getTaxSettingsByYears } = dbUtils.taxSettingModelUtils;

var getTaxSettingsController = async (req, res, next) => {
  var { userId } = req.params;

  var { taxSettings } = await getTaxSettingsByYears(userId);
  var { filteredTaxSettings } = excludeFutureTaxSetting(taxSettings);

  return res.json({ taxSettings: filteredTaxSettings });
};

export default getTaxSettingsController;
