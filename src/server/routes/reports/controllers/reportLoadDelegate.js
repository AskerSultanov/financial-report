import dbUtils from "../../../database/modelsUtil/index.js";
import isLastRequestTooRecent from "../services/different/isLastRequestTooRecent.js";
import sendReportPeriodsToReportLoader from "../services/different/sendReportPeriodsToReportLoader.js";

var reportLoadDelegateController = async (req, res, next) => {
  var { needToLoadAllReports, isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek || needToLoadAllReports) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);

      res.status(status).json({ msg: "Загрузка отчётов началась. Они будут отображаться по мере их добавления" });
    } catch (e) {
      res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }

    return;
  }

  var { lastReportRequestTimestamp } = await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(req.body.userId);

  var { needToDalay } = isLastRequestTooRecent(lastReportRequestTimestamp);

  if (needToDalay) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);

      res.status(status).json({ msg: "Отчет скоро будет добавлен." });
    } catch (e) {
      res.status(500).json({ msg: "Не удалось загрузить отчёт за выбранный период.\nПопробуйте повторить еще раз." });
    }

    return;
  }

  next();
};

export default reportLoadDelegateController;
