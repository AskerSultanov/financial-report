import { join } from "node:path";

var getOptionsPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/taxParams/index.html"));

export default getOptionsPageController;
