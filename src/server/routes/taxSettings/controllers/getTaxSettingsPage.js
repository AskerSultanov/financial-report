import { join } from "node:path";

var getTaxSettingsPageController = async (req, res, next) =>
  res.sendFile(
    join(import.meta.dirname, "../../../../public/html/taxSettings/index.html"),
  );

export default getTaxSettingsPageController;
