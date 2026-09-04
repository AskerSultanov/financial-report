import { getReportAsXLSXBuffer } from "../../reports/services/reportAsXLSXBuffer/index.js";

var downloadReportAsXLSXController = async (req, res, next) => {
  var { report } = req.body;

  if (!report) {
    return res.status(500).json({ msg: "Не удалось скачать отчет..." });
  }

  var { buffer } = await getReportAsXLSXBuffer(report);

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

export default downloadReportAsXLSXController;
