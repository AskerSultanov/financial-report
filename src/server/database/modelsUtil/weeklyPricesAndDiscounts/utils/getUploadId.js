import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var getUploadId = async (userId) => {
  var { uploadId } = await weeklyPricesAndDiscountsModel.findOne({ userId });

  return { uploadId };
};

export default getUploadId;
