import getRequiredSkuKeys from "./getRequiredSkuKeys.js";
import writeTitlesToSkusWorkSheet from "./writeTitlesToSkusWorkSheet.js";
import { writeValuesToSkusWorkSheet } from "./writeValuesToSkusWorkSheet.js";

var createSkusWorkSheet = (skus, workSheet) => {
  writeTitlesToSkusWorkSheet(workSheet);

  var requiredSkuKeys = getRequiredSkuKeys(skus);

  writeValuesToSkusWorkSheet(workSheet, requiredSkuKeys);
};

export default createSkusWorkSheet;
