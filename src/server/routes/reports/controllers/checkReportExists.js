import dbUtils from "../../../database/modelsUtil/index.js";

var { checkReportExistByDate } = dbUtils.reportPeriodsModelUtils;
var { getEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var checkReportExistsController = async (req, res, next) => {
  var { userId, dateFrom } = req.body;

  var { emptyReportPeriods } = await getEmptyReportPeriods(userId);

  var reportPeriodExistInEmptyPeriods = emptyReportPeriods.find(
    (item) => item.dateFrom === dateFrom,
  );

  if (reportPeriodExistInEmptyPeriods) {
    return res.json({
      infoText: "Нет данных за отчетный период",
      errorText: "",
      reportData: {},
    });
  }

  var report = await checkReportExistByDate(userId, dateFrom);

  if (report) {
    return res.json({
      infoText: "Отчет за данный период уже существует.",
      errorText: "",
      reportData: {},
    });
  }

  next();
};

export default checkReportExistsController;
