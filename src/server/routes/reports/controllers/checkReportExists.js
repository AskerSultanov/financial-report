import dbUtils from "../../../database/modelsUtil/index.js";
import checkReportExistsInTree from "../services/different/checkReportExistsInTree.js";

var { getReportTree } = dbUtils.reportsTreeModelUtils;
var { getEmptyReportPeriods } = dbUtils.reportLoadingStateModelUtils;

var checkReportExists = async (req, res, next) => {
  var { dateFrom, userId } = req.body;

  var { emptyReportPeriods } = await getEmptyReportPeriods(userId);

  var emptyReportPeriodIsExist = emptyReportPeriods.find((item) => item.dateFrom === dateFrom);

  if (emptyReportPeriodIsExist) {
    return res.sendStatus(204);
  }

  var { reportTree } = await getReportTree(userId);
  var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

  if (reportIsExist) {
    return res.status(409).json({ msg: "Отчет за данный период уже существует.\nЧтобы загрузить отчет еще раз, необходимо его удалить." });
  }

  next();
};

export default checkReportExists;
