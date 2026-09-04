import { join } from "node:path";

var getAdminAuthPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/auth.html"));

export default getAdminAuthPageController;
