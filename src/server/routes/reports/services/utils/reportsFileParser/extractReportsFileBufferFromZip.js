import JSZip from "jszip";
import getReportIdFromFileName from "./getReportIdFromFileName.js";

var zipFileMimeTypes = ["application/zip", "application/x-zip-compressed"];
var xlsxFileMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

var paidStorageReportFileName = "Отчёт по платному хранению (номенклатуры)";
var weeklyFinancialReportFileName = "Еженедельный детализированный отчет №";

var extractReportsFileBufferFromZip = async (fileBuffers) => {
  var paidStorageReportsBuffer = [];
  var weeklyFinancialReportsBuffer = [];

  for (var { buffer, mimetype, originalname } of fileBuffers) {
    if (zipFileMimeTypes.includes(mimetype)) {
      var zip = new JSZip();

      await zip.loadAsync(buffer, { base64: true }).then(async ({ files }) => {
        for (var file of Object.keys(files)) {
          var nestedFileName = files[file].name;

          var xlsxBuffer = await zip.file(nestedFileName).async("nodebuffer");

          if (nestedFileName?.split(" ")?.slice(1)?.join(" ")?.startsWith(paidStorageReportFileName)) {
            paidStorageReportsBuffer.push(xlsxBuffer);
          } else if (nestedFileName?.startsWith(weeklyFinancialReportFileName)) {
            var { reportId } = getReportIdFromFileName(nestedFileName);
            weeklyFinancialReportsBuffer.push({ reportId, buffer: xlsxBuffer });
          }
        }
      });
    } else if (mimetype === xlsxFileMimeType) {
      if (originalname?.split(" ")?.slice(1)?.join(" ")?.startsWith(paidStorageReportFileName)) {
        paidStorageReportsBuffer.push(buffer);
      } else if (originalname?.startsWith(weeklyFinancialReportFileName)) {
        var { reportId } = getReportIdFromFileName(originalname);
        weeklyFinancialReportsBuffer.push({ reportId, buffer });
      }
    }
  }

  return { paidStorageReportsBuffer, weeklyFinancialReportsBuffer };
};

export default extractReportsFileBufferFromZip;
