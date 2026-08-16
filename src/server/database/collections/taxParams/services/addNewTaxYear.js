import defaultTaxParams from "../../../defaultTaxParams.js";

var addNewTaxYearToDb = async (collection, userId, year, session) => {
  var data = await collection.findOne({ userId }, null, { session: session });
  var taxYears = data.toObject().years;

  var existTaxParams = taxYears.find((params) => params.year === year);
  if (existTaxParams) {
    var nextYear = year + 1;
    var nextYearTaxParams = taxYears.find((params) => params.year === nextYear);
    if (!nextYearTaxParams) {
      var defaultNextYearTaxParams = defaultTaxParams.find((i) => i.year === nextYear);
      await collection.updateOne({ userId }, { $push: { years: { ...defaultNextYearTaxParams } } }, { session: session });
    }

    return existTaxParams;
  }

  var defaultCurrentYearTaxParams = defaultTaxParams.find((i) => i.year === year);

  await collection.updateOne({ userId }, { $push: { years: { ...defaultCurrentYearTaxParams } } }, { session: session });

  return defaultCurrentYearTaxParams;
};

export default addNewTaxYearToDb;
