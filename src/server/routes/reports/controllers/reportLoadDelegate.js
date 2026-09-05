import dbUtils from "../../../database/modelsUtil/index.js";
import isLastRequestTooRecent from "../services/different/isLastRequestTooRecent.js";
import sendReportPeriodsToReportLoader from "../services/different/sendReportPeriodsToReportLoader.js";

var reportLoadDelegateController = async (req, res, next) => {
  var { needToLoadAllReports, isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek || needToLoadAllReports) {
    try {
      await sendReportPeriodsToReportLoader(req.body);
      res.json({
        infoText:
          "Загрузка отчётов началась. Они будут отображаться по мере их добавления",
        errorText: "",
        reportData: {},
      });
    } catch (e) {
      console.log(e);
      res.json({
        errorText:
          "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному",
        intoText: "",
        reportData: {},
      });
    }

    return;
  }

  var { lastReportRequestTimestamp } =
    await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(
      req.body.userId,
    );

  var { needToDelay } = isLastRequestTooRecent(lastReportRequestTimestamp);

  if (needToDelay) {
    try {
      await sendReportPeriodsToReportLoader(req.body);

      res.json({
        infoText: "Отчет скоро будет добавлен.",
        errorText: "",
        reportData: {},
      });
    } catch (e) {
      console.log(e);
      res.json({
        errorText:
          "Не удалось загрузить отчёт за выбранный период.\nПопробуйте повторить еще раз.",
        intoText: "",
        reportData: {},
      });
    }

    return;
  }

  next();
};

export default reportLoadDelegateController;
