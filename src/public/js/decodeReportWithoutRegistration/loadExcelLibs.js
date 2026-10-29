var jszipUrl = "https://cdn.jsdelivr.net/npm/jszip@3.10.2/dist/jszip.min.js";
var exceljsUrl =
  "https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js";

var excelLibsPromise = null;

var loadExcelLibs = () => {
  if (!excelLibsPromise) {
    excelLibsPromise = Promise.all([import(jszipUrl), import(exceljsUrl)])
      .then(() => ({ JSZip: window.JSZip, ExcelJS: window.ExcelJS }))
      .catch((error) => {
        excelLibsPromise = null;
        throw error;
      });
  }

  return excelLibsPromise;
};

export default loadExcelLibs;
