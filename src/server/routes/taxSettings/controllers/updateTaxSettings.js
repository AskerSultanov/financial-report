import updateTaxRateService from "../services/updateTaxRate.js";
import getTaxSettingKeyName from "../services/utils/getTaxSettingKeyName.js";
import updateMandatoryInsuranceFeeRateService from "../services/updateMandatoryInsuranceFeeRate.js";

var updateTaxSettingsController = async (req, res, next) => {
  var { userId, year, reportsNeedRecalculation, data } = req.body;

  var { taxSettingKeyName } = getTaxSettingKeyName(data);

  switch (taxSettingKeyName) {
    case "taxRate":
      var newTaxRate = data[taxSettingKeyName];
      var { taxRateIsEqual } = await updateTaxRateService(
        userId,
        year,
        newTaxRate,
        reportsNeedRecalculation,
      );

      if (taxRateIsEqual) {
        return res.sendStatus(409);
      }

      break;

    case "mandatoryInsuranceFeeRate":
      var newMandatoryInsuranceFeeRate = data[taxSettingKeyName];

      var { mandatoryInsuranceFeeRateIsEqual } =
        await updateMandatoryInsuranceFeeRateService(
          userId,
          year,
          newMandatoryInsuranceFeeRate,
          reportsNeedRecalculation,
        );

      if (mandatoryInsuranceFeeRateIsEqual) {
        return res.sendStatus(409);
      }

      break;
  }
};

export default updateTaxSettingsController;
