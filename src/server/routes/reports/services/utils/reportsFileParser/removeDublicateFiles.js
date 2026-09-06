import getReportIdFromFileName from "./getReportIdFromFileName.js";
import getReportPeriodFromPaisStorageReportFileName from "./getReportPeriodFromPaisStorageReportFileName.js";

var paidStorageReportFileName = "Отчёт по платному хранению (номенклатуры)";
var weeklyFinancialReportFileName = "Еженедельный детализированный отчет №";

var removeDublicateFiles = (files) => {
  var uniqueFiles = new Map();

  for (var { buffer, mimetype, originalname } of files) {
    var decodedFileName = Buffer.from(originalname, "latin1").toString("utf8");

    if (originalname.startsWith(weeklyFinancialReportFileName) || decodedFileName.startsWith(weeklyFinancialReportFileName)) {
      originalname = originalname.startsWith(weeklyFinancialReportFileName) ? originalname : decodedFileName;
      var { reportId } = getReportIdFromFileName(originalname);

      if (!uniqueFiles.has(reportId)) {
        uniqueFiles.set(reportId, { buffer, mimetype, originalname });
      }
    } else if (originalname.startsWith(paidStorageReportFileName)) {
      var { paidStorageReportPeriod } = getReportPeriodFromPaisStorageReportFileName(originalname);

      if (!uniqueFiles.has(paidStorageReportPeriod)) {
        uniqueFiles.set(paidStorageReportPeriod, { buffer, mimetype, originalname });
      }
    }
  }

  return { deduplicatedFiles: [...uniqueFiles.values()] };
};

export default removeDublicateFiles;
