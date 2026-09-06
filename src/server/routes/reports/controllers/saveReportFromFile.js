import saveReportFromFileService from "../services/saveReportFromFile.js";

var saveReportFromFileController = async (req, res, next) => {
  var files = req.files;
  var { userId } = req.body;

  var { reportsData } = await saveReportFromFileService(userId, files);

  return res.json({ reportsData });
};

export default saveReportFromFileController;
