import getReportIdFromFileName from "./getReportIdFromFileName.js";
import getReportPeriodFromPaisStorageReportFileName from "./getReportPeriodFromPaisStorageReportFileName.js";

var paidStorageReportFileName = "Отчёт по платному хранению (номенклатуры)";
var weeklyFinancialReportFileName = "Еженедельный детализированный отчет №";

var removeDublicateFiles = (files) => {
  var uniqueFiles = new Map();

  for (var { buffer, mimetype, originalname } of files) {
    if (originalname.startsWith(weeklyFinancialReportFileName)) {
      var { reportId } = getReportIdFromFileName(originalname);

      if (!uniqueFiles.has(reportId)) {
        uniqueFiles.set(reportId, { buffer, mimetype, originalname });
      }
    } else if (originalname.startsWith(paidStorageReportFileName)) {
      var { paidStorageReportPeriod } =
        getReportPeriodFromPaisStorageReportFileName(originalname);

      if (!uniqueFiles.has(paidStorageReportPeriod)) {
        uniqueFiles.set(paidStorageReportPeriod, {
          buffer,
          mimetype,
          originalname,
        });
      }
    }
  }

  return { deduplicatedFiles: [...uniqueFiles.values()] };
};

export default removeDublicateFiles;
