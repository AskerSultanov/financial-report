import saveReportsService from "../services/saveReports.js";

var saveReportsController = async (req, res) => {
  var { reportData, errorText, infoText } = await saveReportsService(req.body);

  return res.json({ reportData, errorText, infoText });
};

export default saveReportsController;
