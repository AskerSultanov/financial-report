import dbUtils from "../../../database/modelsUtil/index.js";

var { checkReportExistByDate } = dbUtils.reportPeriodsModelUtils;
var { getEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var checkReportExistsController = async (req, res, next) => {
  var { dateFrom, dateTo, userId } = req.body;

  var { emptyReportPeriods } = await getEmptyReportPeriods(userId);

  var emptyReportPeriodIsExist = emptyReportPeriods.find((item) => item.dateFrom === dateFrom);

  if (emptyReportPeriodIsExist) {
    return res.sendStatus(204);
  }

  var report = checkReportExistByDate(userId, dateFrom);

  if (report) {
    return res.status(409).json({ msg: "Отчет за данный период уже существует.\nЧтобы загрузить отчет еще раз, необходимо его удалить." });
  }

  next();
};

export default checkReportExistsController;
