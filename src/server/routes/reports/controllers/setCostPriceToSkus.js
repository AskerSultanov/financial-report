import setCostPriceToSkusService from "../services/setCostPriceToSkus.js";

var setCostPriceToSkusController = async (req, res, next) => {
  var { updatedSkus, reportNotFound, dataIsInvalid, updatedSkusData } =
    await setCostPriceToSkusService(req.body);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  if (dataIsInvalid) {
    return res.sendStatus(400);
  }

  return res.json({ updatedSkus });
};

export default setCostPriceToSkusController;
