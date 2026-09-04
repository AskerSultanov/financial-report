import dbUtils from "../../../database/modelsUtil/index.js";
import excludeFutureTaxParams from "../services/excludeFutureTaxParams.js";

var { getTaxParamsFromDb } = dbUtils.taxParamsModelUtils;

var getTaxParamsController = async (req, res, next) => {
  var { userId } = req.params;

  var taxParams = await getTaxParamsFromDb(userId);
  var { filteredTaxParams } = excludeFutureTaxParams(taxParams);

  return res.json({ taxParams: filteredTaxParams });
};

export default getTaxParamsController;
