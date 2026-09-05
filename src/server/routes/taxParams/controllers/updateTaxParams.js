import updateTaxRateService from "../services/updateTaxRate.js";
import getTaxParamKeyName from "../services/utils/getTaxParamKeyName.js";
import updateMandatoryInsuranceFeeRateService from "../services/updateMandatoryInsuranceFeeRate.js";

var updateTaxParamsController = async (req, res, next) => {
  var { userId, year, reportsNeedRecalculation, data } = req.body;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  switch (taxParamKeyName) {
    case "taxRate":
      var newTaxRate = data[taxParamKeyName];
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
      var newMandatoryInsuranceFeeRate = data[taxParamKeyName];

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

export default updateTaxParamsController;
