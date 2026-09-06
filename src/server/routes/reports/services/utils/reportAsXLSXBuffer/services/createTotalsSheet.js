import writeTotalsTitleToSheet from "./writeTotalsTitleToSheet.js";
import writeTotalValuesToSheet from "./writeTotalValuesToSheet.js";

var createTotalsSheet = async (report, sheet, indent) => {
  sheet = writeTotalsTitleToSheet(sheet, indent);
  sheet = writeTotalValuesToSheet(sheet, indent, report);

  return sheet;
};

export default createTotalsSheet;
