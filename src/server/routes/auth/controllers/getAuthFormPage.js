import { join } from "node:path";

var getAuthFormPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/auth/index.html"));

export default getAuthFormPageController;
