import setNewPricesAndDiscountsToSkuService from "../services/setNewPricesAndDiscountsToSku.js";

var setNewPricesAndDiscountsToSkuController = async (req, res, next) => {
  var { callNext, errorText } = await setNewPricesAndDiscountsToSkuService(
    req.body,
  );

  if (!callNext) {
    return res.json({ errorText });
  }

  next();
};

export default setNewPricesAndDiscountsToSkuController;
