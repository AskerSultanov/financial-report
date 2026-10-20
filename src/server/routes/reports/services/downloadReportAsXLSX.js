import dbUtils from "../../../database/modelsUtil/index.js";
import { getReportAsXLSXBuffer } from "./utils/reportToXlsxBuffer/index.js";

var { getReportById } = dbUtils.reportModelUtils;

var downloadReportAsXLSXService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReportById(userId, reportId);

  var { buffer } = await getReportAsXLSXBuffer(report);

  return { buffer };
};

export default downloadReportAsXLSXService;
