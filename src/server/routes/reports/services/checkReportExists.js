import dbUtils from "../../../database/modelsUtil/index.js";

var { checkReportExistByDate } = dbUtils.reportPeriodsModelUtils;
var { getEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var checkReportExistsService = async (data) => {
  var { userId, dateFrom } = data;

  var { emptyReportPeriods } = await getEmptyReportPeriods(userId);

  var reportPeriodExistInEmptyPeriods = emptyReportPeriods.find(
    (item) => item.dateFrom === dateFrom,
  );

  if (reportPeriodExistInEmptyPeriods) {
    return { reportIsEmpty: true, reportIsExist: false };
  }

  var report = await checkReportExistByDate(userId, dateFrom);

  if (report) {
    return { reportIsEmpty: false, reportIsExist: true };
  }

  return { reportIsEmpty: false, reportIsExist: false };
};

export default checkReportExistsService;
