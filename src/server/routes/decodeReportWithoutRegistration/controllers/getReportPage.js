import { join } from "node:path";

var getReportPageController = async (req, res, next) =>
  res.sendFile(join(import.meta.dirname, "../../../../public/html/decodeReportWithoutRegistration/report.html"));

export default getReportPageController;
