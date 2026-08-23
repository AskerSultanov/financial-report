import processCrossReportSkus from "./processCrossReportSkus.js";
import processNonCrossReportSkus from "./processNonCrossReportSkus.js";

var parseReports = async (reports, taxParams, isCrossYearPeriod, isReportFromFile = false) => {
  if (isCrossYearPeriod) {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = await processCrossReportSkus(reports, taxParams);

    return { skus, skuNamesAndIds, recalculatedTaxParams };
  } else {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = await processNonCrossReportSkus(reports, taxParams);

    return { skus, skuNamesAndIds, recalculatedTaxParams };
  }
};

export default parseReports;
