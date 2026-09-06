import changeWeeklyPricesOrDiscountsService from "../services/changeWeeklyPricesOrDiscounts.js";

var changeWeeklyPricesOrDiscountsController = async (req, res, next) => {
  await changeWeeklyPricesOrDiscountsService(req.body);

  return res.json({ errorText: "" });
};

export default changeWeeklyPricesOrDiscountsController;
