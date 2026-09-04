import { join } from "node:path";

var getReportPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/report/index.html"));

export default getReportPageController;
