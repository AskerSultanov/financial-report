import dbUtils from "../../../database/modelsUtil/index.js";
import isLastRequestTooRecent from "./utils/different/isLastRequestTooRecent.js";
import sendReportPeriodsToReportLoader from "./utils/different/sendReportPeriodsToReportLoader.js";

var reportLoadDelegateService = async (data) => {
  var { needToLoadAllReports, isPeriodWithinSameWeek } = data;

  if (!isPeriodWithinSameWeek || needToLoadAllReports) {
    try {
      await sendReportPeriodsToReportLoader(data);
      return {
        infoText:
          "Загрузка отчётов началась. Они будут отображаться по мере их добавления",
        errorText: "",
        reportData: {},
        callNext: false,
      };
    } catch (e) {
      console.log({ e });

      return {
        errorText:
          "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному",
        infoText: "",
        reportData: {},
        callNext: false,
      };
    }
  }

  var { lastReportRequestTimestamp } =
    await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(
      data.userId,
    );

  var { needToDelay } = isLastRequestTooRecent(lastReportRequestTimestamp);

  if (needToDelay) {
    try {
      await sendReportPeriodsToReportLoader(data);

      return {
        infoText: "Отчет скоро будет добавлен.",
        errorText: "",
        reportData: {},
        callNext: false,
      };
    } catch (e) {
      console.log(e);

      return {
        errorText:
          "Не удалось загрузить отчёт за выбранный период.\nПопробуйте повторить еще раз.",
        infoText: "",
        reportData: {},
        callNext: false,
      };
    }
  }

  return {
    errorText: "",
    infoText: "",
    reportData: {},
    callNext: true,
  };
};

export default reportLoadDelegateService;
