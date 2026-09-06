import setOtherExpensesToSkuService from "../services/setOtherExpensesToSku.js";

var setOtherExpensesToSkuController = async (req, res, next) => {
  var { reportNotFound, otherExpensesIsEqual, updatedSkuData } =
    await setOtherExpensesToSkuService(req.body);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  if (otherExpensesIsEqual) {
    return res.sendStatus(409);
  }

  return res.json(updatedSkuData);
};

export default setOtherExpensesToSkuController;
