var getReportIdFromFileName = (fileName) => {
  var reportIdWithFileExtension = fileName.split("№")[1];
  var reportId = +reportIdWithFileExtension.split("_")[0];
  return { reportId };
};

export default getReportIdFromFileName;
