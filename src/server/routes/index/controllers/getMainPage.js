import { join } from "node:path";

var getMainPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/index.html"));

export default getMainPageController;
