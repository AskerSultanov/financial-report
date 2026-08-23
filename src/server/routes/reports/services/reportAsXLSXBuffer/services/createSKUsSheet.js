import { writeSKUsToSheet } from "./writeSKUsToSheet.js";
import writeSKUsTitleToSheet from "./writeSKUsTitleToSheet.js";
import { getRequiredSKUFieldsName } from "./getRequiredSKUFieldsName.js";

var createSKUsSheet = async (skus, sheet) => {
  var skus = getRequiredSKUFieldsName(skus);

  sheet = writeSKUsToSheet(sheet, skus);
  sheet = writeSKUsTitleToSheet(sheet);

  return sheet;
};

export default createSKUsSheet;
