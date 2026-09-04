import { join } from "node:path";

var getUserWbTokenPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userWbTokenPage.html"));

export default getUserWbTokenPageController;
