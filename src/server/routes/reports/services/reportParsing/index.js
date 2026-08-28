import processCrossReportSkus from "./processCrossReportSkus.js";
import processNonCrossReportSkus from "./processNonCrossReportSkus.js";

var parseReports = async (reports, taxParams, isCrossYearPeriod) => {
  if (isCrossYearPeriod) {
    var { skus, skuNamesAndIds, recalculatedTaxParams } = await processCrossReportSkus(reports, taxParams);

    return { skus, skuNamesAndIds, recalculatedTaxParams };
  } else {
    var { skus, skuNamesAndIds, recalculatedTaxParams } = await processNonCrossReportSkus(reports, taxParams);

    return { skus, skuNamesAndIds, recalculatedTaxParams };
  }
};

export default parseReports;
