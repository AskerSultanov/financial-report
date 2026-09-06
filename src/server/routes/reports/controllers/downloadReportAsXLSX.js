import downloadReportAsXLSXService from "../services/downloadReportAsXLSX.js";

var downloadReportAsXLSXController = async (req, res, next) => {
  var { buffer } = await downloadReportAsXLSXService(req.body);

  res.set({
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

export default downloadReportAsXLSXController;
