import truncateNum from "./truncateNum.js";

var truncateSkuNums = (skus) =>
  skus.map((sku) => {
    for (var key in sku) {
      sku[key] = truncateNum(sku[key]);
    }

    return sku;
  });

export default truncateSkuNums;
