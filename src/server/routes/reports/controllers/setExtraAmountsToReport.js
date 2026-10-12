import setExtraAmountsToReportService from "../services/setExtraAmountsToReport.js";

var setExtraAmountsToReport = async (req, res, next) => {
  var { data, reportNotFound } = await setExtraAmountsToReportService(req.body);

  var errorText = "";

  if (reportNotFound) {
    errorText = "Отчет не найден";
  }

  return res.json({ data, errorText });
};

export default setExtraAmountsToReport;
