import checkReportExistsService from "../services/checkReportExists.js";

var checkReportExistsController = async (req, res, next) => {
  var { reportIsExist, reportIsEmpty } = await checkReportExistsService(
    req.body,
  );

  if (reportIsEmpty) {
    return res.json({
      infoText: "Нет данных за отчетный период",
      errorText: "",
      reportData: {},
    });
  }

  if (reportIsExist) {
    return res.json({
      infoText: "Отчет за данный период уже существует.",
      errorText: "",
      reportData: {},
    });
  }

  next();
};

export default checkReportExistsController;
