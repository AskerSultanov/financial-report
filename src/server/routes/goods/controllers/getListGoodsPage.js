import { join } from "node:path";

var getListGoodsPageController = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/goods/index.html"));

export default getListGoodsPageController;
