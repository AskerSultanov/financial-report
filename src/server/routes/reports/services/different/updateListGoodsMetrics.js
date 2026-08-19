import truncateNum from "../reportParsing/truncateNum.js";

var startYearPropPostfix = "InCurrentYear";
var endYearPropPostfix = "InNextYear";

var updateListGoodsMetrics = async (report, listGoods) => {
  if (!report.skus.length || !listGoods.length) {
    return { listGoodsWithUpdatedSkuMetrics: [] };
  }

  var { year } = report.recordedTo;

  if (report.isCrossYearPeriod) {
    var startYear = year;
    var endYear = +report.dateTo.split("-")[0];
  }

  for (var sku of report.skus) {
    var skuFilteredBySkuNameAndId = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName);

    if (!skuFilteredBySkuNameAndId) {
      continue;
    }

    if (!skuFilteredBySkuNameAndId?.metrics) {
      skuFilteredBySkuNameAndId.metrics = [];
    }

    var skuMetrics = skuFilteredBySkuNameAndId.metrics;

    if (report.isCrossYearPeriod) {
      var indexOfStartYearMetric = skuMetrics.findIndex((metric) => metric.year === startYear);

      var startYearMetric;

      if (indexOfStartYearMetric === -1) {
        skuMetrics[skuMetrics.length] = { year: startYear, ...defaultSkuMetricsField };
        startYearMetric = skuMetrics[skuMetrics.length - 1];
      } else {
        startYearMetric = skuMetrics[indexOfStartYearMetric];
      }

      startYearMetric = aggregateSkuMetrics(startYearMetric, sku, startYearPropPostfix);

      var indexOfEndYearMetric = skuMetrics.findIndex((metric) => metric.year === endYear);

      var endYearMetric;

      if (indexOfEndYearMetric === -1) {
        if (indexOfStartYearMetric === -1) {
          skuMetrics[skuMetrics.length + 1] = { year: endYear, ...defaultSkuMetricsField };
        } else {
          skuMetrics[skuMetrics.length] = { year: endYear, ...defaultSkuMetricsField };
        }

        endYearMetric = skuMetrics[skuMetrics.length - 1];
      } else {
        endYearMetric = skuMetrics[indexOfEndYearMetric];
      }

      endYearMetric = aggregateSkuMetrics(endYearMetric, sku, endYearPropPostfix);
    } else {
      var indexOfSkuMetric = skuMetrics.findIndex((metric) => metric.year === year);
      var skuMetric;

      if (indexOfSkuMetric === -1) {
        skuMetrics[skuMetrics.length] = { year, ...defaultSkuMetricsField };
        skuMetric = skuMetrics[skuMetrics.length - 1];
      } else {
        skuMetric = skuMetrics[indexOfSkuMetric];
      }

      skuMetric = aggregateSkuMetrics(skuMetric, sku);
    }
  }

  return { listGoodsWithUpdatedSkuMetrics: listGoods };
};

export default updateListGoodsMetrics;
