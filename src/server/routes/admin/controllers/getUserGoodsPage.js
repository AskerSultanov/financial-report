import { join } from "node:path";

var getUserGoodsPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userGoodsPage.html"));

export default getUserGoodsPageController;
