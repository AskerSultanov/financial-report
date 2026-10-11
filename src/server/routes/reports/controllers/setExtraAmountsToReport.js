import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { getReportById, saveUpdatedReport } = dbUtils.reportModelUtils;

var setExtraAmountsToReport = async (req, res, next) => {
  var { userId, reportId, year, isCrossYearPeriod, data } = req.body;

  switch (data.key) {
  }
};

export default setExtraAmountsToReport;
