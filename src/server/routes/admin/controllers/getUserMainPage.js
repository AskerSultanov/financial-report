import { join } from "node:path";

var getUserMainPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userMainPage.html"));

export default getUserMainPageController;
