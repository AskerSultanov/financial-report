import getSkusMetricsFileService from "../services/getSkusMetricsFile.js";

var getSkusMetricsFileController = async (req, res, next) => {
  var { userId } = req.params;

  var { skusMetricsFileBuffer } = await getSkusMetricsFileService(userId);

  res.set({
    "Content-Disposition": 'attachment; filename="file.xlsx"',
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return res.send(skusMetricsFileBuffer);
};

export default getSkusMetricsFileController;
