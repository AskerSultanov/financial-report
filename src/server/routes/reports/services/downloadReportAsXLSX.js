import dbUtils from "../../../database/modelsUtil/index.js";
import { generateReportXlsxBuffer } from "./utils/reportToXlsxBuffer/index.js";

var { getReport } = dbUtils.basicReportsDataModelUtils;

var downloadReportAsXLSXService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReport(userId, reportId);

  var { buffer } = await generateReportXlsxBuffer(report);

  return { buffer };
};

export default downloadReportAsXLSXService;
