import dbUtils from "../../../database/modelsUtil/index.js";
import * as prismaServices from "../../../postgres/services/index.js";

var { checkReportExistByDate } = dbUtils.reportPeriodsModelUtils;
var { getEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var checkReportExistsService = async (data) => {
  var { userId, dateFrom, dateTo } = data;

  var { emptyReportPeriods } = await getEmptyReportPeriods(userId);

  var reportFromEmptyPeriods =
    await prismaServices.emptyReportPeriodsModelServices.getReportFromEmptyPeriods(
      userId,
      dateFrom,
      dateTo,
    );

  var reportPeriodExistInEmptyPeriods = emptyReportPeriods.find(
    (item) => item.dateFrom === dateFrom,
  );

  if (reportPeriodExistInEmptyPeriods && reportFromEmptyPeriods) {
    return { reportIsEmpty: true, reportIsExist: false };
  }

  var report = await checkReportExistByDate(userId, dateFrom);

  var reportFromPg =
    await prismaServices.reportPeriodsModelServices.checkReportExistByDate(
      userId,
      dateFrom,
      dateTo,
    );

  if (report && reportFromPg) {
    return { reportIsEmpty: false, reportIsExist: true };
  }

  return { reportIsEmpty: false, reportIsExist: false };
};

export default checkReportExistsService;
