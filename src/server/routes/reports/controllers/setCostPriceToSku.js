import setCostPriceToSkuService from "../services/setCostPriceToSku.js";

var setCostPriceToSkuController = async (req, res, next) => {
  var { reportNotFound, costPriceIsEqual, updatedSkuData } =
    await setCostPriceToSkuService(req.body);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  if (costPriceIsEqual) {
    return res.sendStatus(409);
  }

  return res.json(updatedSkuData);
};

export default setCostPriceToSkuController;
