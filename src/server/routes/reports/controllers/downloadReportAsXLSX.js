import dbUtils from "../../../database/modelsUtil/index.js";
import { getReportAsXLSXBuffer } from "../services/reportAsXLSXBuffer/index.js";

var { getReportById } = dbUtils.reportModelUtils;

var downloadReportAsXLSXController = async (req, res, next) => {
  var { userId, reportId } = req.body;

  var { report } = await getReportById(userId, reportId);

  var { buffer } = await getReportAsXLSXBuffer(report);

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

export default downloadReportAsXLSXController;
