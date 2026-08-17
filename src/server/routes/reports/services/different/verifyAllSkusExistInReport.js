var verifyAllSkusExistInReport = (skusFromReport, skuNamesForUpdate) => {
  var allSkusExist = true;

  for (var skuNameForUpdate of skuNamesForUpdate) {
    var skuExist = skusFromReport.find((skuFromReport) => skuFromReport.skuName === skuNameForUpdate);

    if (!skuExist) {
      allSkusExist = false;
      break;
    }
  }

  return { allSkusExist };
};

export default verifyAllSkusExistInReport;
