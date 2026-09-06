import downloadReportsAsZipService from "../services/downloadReportsAsZip.js";

var downloadReportsAsZipController = async (req, res, next) => {
  var { zipBuffer } = await downloadReportsAsZipService(req.body);

  res.set({
    "Content-Type": "application/zip",
    "Content-Length": zipBuffer.length,
    "Content-Disposition": 'attachment; filename="reports.zip"',
  });

  return res.send(zipBuffer);
};

export default downloadReportsAsZipController;
