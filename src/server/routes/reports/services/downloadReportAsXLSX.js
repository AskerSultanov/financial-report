import dbUtils from "../../../database/modelsUtil/index.js";
import { generateReportXlsxBuffer } from "./utils/reportToXlsxBuffer/index.js";

var { getReportById } = dbUtils.reportModelUtils;

var downloadReportAsXLSXService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReportById(userId, reportId);

  var { buffer } = await generateReportXlsxBuffer(report);

  return { buffer };
};

export default downloadReportAsXLSXService;
