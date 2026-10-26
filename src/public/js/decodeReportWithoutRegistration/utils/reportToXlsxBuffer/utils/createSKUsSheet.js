import { writeSKUsToSheet } from "./writeSKUsToSheet.js";
import writeSKUsTitleToSheet from "./writeSKUsTitleToSheet.js";
import { getRequiredSkusFieldsName } from "./getRequiredSkusFieldsName.js";

var createSkusSheet = async (skus, sheet) => {
  var skus = getRequiredSkusFieldsName(skus);

  sheet = writeSKUsToSheet(sheet, skus);
  sheet = writeSKUsTitleToSheet(sheet);

  return sheet;
};

export default createSkusSheet;
