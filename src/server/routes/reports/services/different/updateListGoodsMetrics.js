import truncateNum from "../reportParsing/truncateNum.js";
import { defaultSkuMetricsField } from "./addDefaultMetricsToSku.js";

var startYearPropPostfix = "InCurrentYear";
var endYearPropPostfix = "InNextYear";

var aggregateSkuMetrics = (skuMetrics, sku, postfix = "") => {
  skuMetrics.qty += sku["qty" + postfix];
  skuMetrics.tax += sku["tax" + postfix];
  skuMetrics.fines += sku["fines" + postfix];
  skuMetrics.taxableAmount += sku["taxableAmount" + postfix];
  skuMetrics.retailAmount += sku["retailAmount" + postfix];
  skuMetrics.returnAmount += sku["returnAmount" + postfix];
  skuMetrics.storageCost += sku["storageCost" + postfix];
  skuMetrics.deliveryCost += sku["deliveryCost" + postfix];
  skuMetrics.acceptance += sku["acceptance" + postfix];
  skuMetrics.sellerPayoutAmount += sku["sellerPayoutAmount" + postfix];
  skuMetrics.deductionOrPayment += sku["deductionOrPayment" + postfix];
  skuMetrics.additionalInsuranceFee += sku["additionalInsuranceFee" + postfix];

  for (var key in skuMetrics) {
    skuMetrics[key] = truncateNum(skuMetrics[key]);
  }

  return skuMetrics;
};

var updateListGoodsMetrics = (report, listGoods) => {
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

    if (!skuFilteredBySkuNameAndId?.metrics) {
      skuFilteredBySkuNameAndId.metrics = [];
    }

    var skuMetrics = skuFilteredBySkuNameAndId.metrics;

    if (report.isCrossYearPeriod) {
      var startYearMetric = skuMetrics.find((i) => i.year === startYear);

      if (!startYearMetric) {
        startYearMetric = { year: startYear, ...defaultSkuMetricsField };
      }

      startYearMetric = aggregateSkuMetrics(startYearMetric, sku, startYearPropPostfix);

      var endYearMetric = skuMetrics.find((i) => i.year === endYear);

      if (!endYearMetric) {
        endYearMetric = { year: endYear, ...defaultSkuMetricsField };
      }

      endYearMetric = aggregateSkuMetrics(endYearMetric, sku, endYearPropPostfix);
    } else {
      var skuMetrics = skuFilteredBySkuNameAndId.metrics;

      var skuMetric = skuMetrics.find((i) => i.year === year);

      if (!skuMetric) {
        skuMetric = { year, ...defaultSkuMetricsField };
      }

      skuMetric = aggregateSkuMetrics(skuMetric, sku);
    }
  }

  return { listGoodsWithUpdatedSkuMetrics: listGoods };
};

export default updateListGoodsMetrics;
