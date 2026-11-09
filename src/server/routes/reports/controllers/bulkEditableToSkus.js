import bulkEditableToSkusService from "../services/bulkEditableToSkus.js";

var bulkEditableToSkusController = async (req, res) => {
  var { reportNotFound, invalidData, updatedSkus } =
    await bulkEditableToSkusService(req.body);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  if (invalidData) {
    return res.sendStatus(400);
  }

  return res.json({ updatedSkus });
};

export default bulkEditableToSkusController;
