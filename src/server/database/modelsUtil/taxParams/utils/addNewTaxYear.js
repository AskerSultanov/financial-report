import { taxParamModel } from "../../../models/index.js";
import defaultTaxParams from "../../../defaultTaxParams.js";

var addNewTaxYearToDb = async (userId, year, session) => {
  var data = await taxParamModel.findOne({ userId }, null, { session: session });
  var taxYears = data.toObject().years;

  var existTaxParams = taxYears.find((params) => params.year === year);
  if (existTaxParams) {
    var nextYear = year + 1;
    var nextYearTaxParams = taxYears.find((params) => params.year === nextYear);
    if (!nextYearTaxParams) {
      var defaultNextYearTaxParams = defaultTaxParams.find((i) => i.year === nextYear);
      await taxParamModel.updateOne({ userId }, { $push: { years: { ...defaultNextYearTaxParams } } }, { session: session });
    }

    return existTaxParams;
  }

  var defaultCurrentYearTaxParams = defaultTaxParams.find((i) => i.year === year);

  await taxParamModel.updateOne({ userId }, { $push: { years: { ...defaultCurrentYearTaxParams } } }, { session: session });

  return defaultCurrentYearTaxParams;
};

export default addNewTaxYearToDb;
