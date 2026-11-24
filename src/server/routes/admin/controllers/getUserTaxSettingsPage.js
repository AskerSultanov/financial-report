import { join } from "node:path";

var getUserTaxSettingsPageController = async (req, res, next) =>
  res.sendFile(
    join(
      import.meta.dirname,
      "../../../../public/html/admin/userTaxSettingsPage.html",
    ),
  );

export default getUserTaxSettingsPageController;
