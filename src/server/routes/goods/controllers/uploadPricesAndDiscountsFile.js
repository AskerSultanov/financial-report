import uploadPricesAndDiscountsFileService from "../services/uploadPricesAndDiscountsFile.js";

var uploadPricesAndDiscountsFileController = async (req, res, next) => {
  var userId = req.body.userId;
  var fileBuffer = req.file.buffer;

  var { userNotFound, listGoodsIsEmpty, weeklyPricesAndDiscounts } =
    await uploadPricesAndDiscountsFileService(userId, fileBuffer);

  if (userNotFound) {
    return res.sendStatus(404);
  }

  if (listGoodsIsEmpty) {
    return res.sendStatus(400);
  }

  return res.json({ weeklyPricesAndDiscounts });
};

export default uploadPricesAndDiscountsFileController;
