import { Router } from "express";
import removeUserController from "./controllers/removeUser.js";
import getUserMainPageController from "./controllers/getUserMainPage.js";
import getUserGoodsPageController from "./controllers/getUserGoodsPage.js";
import getAdminMainPageController from "./controllers/getAdminMainPage.js";
import getAdminAuthPageController from "./controllers/getAdminAuthPage.js";
import getUserReportPageController from "./controllers/getUserReportPage.js";
import checkAuthAdminDataController from "./controllers/checkAuthAdminData.js";
import getUserWbTokenPageController from "./controllers/getUserWbTokenPage.js";
import getAdminMainPageDataController from "./controllers/getAdminMainPageData.js";
import getUserTaxParamsPageController from "./controllers/getUserTaxParamsPage.js";

import * as joiSchemas from "./joiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminMainPageController);
router.get("/api", getAdminMainPageDataController);
router.get("/auth", getAdminAuthPageController);
router.post("/", checkAuthAdminDataController);
router.delete("/", joiSchemaValidator(joiSchemas.removeUserSchema), removeUserController);

router.get("/user/:userId", getUserMainPageController);
router.get("/user/goods/:userId", getUserGoodsPageController);
router.get("/user/wbtoken/:userId", getUserWbTokenPageController);
router.get("/user/tax-params/:userId", getUserTaxParamsPageController);
router.get("/user/:userId/report/:reportId", getUserReportPageController);

export default router;
