import { join } from "node:path";

var getAdminMainPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/index.html"));

export default getAdminMainPageController;
