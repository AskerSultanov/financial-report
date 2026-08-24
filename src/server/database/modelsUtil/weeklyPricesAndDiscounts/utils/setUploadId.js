import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var setUploadId = async (userId, uploadId, session) => {
  var sessionOpt = session ? { session: session } : {};
  return await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { uploadId } }, { ...sessionOpt });
};

export default setUploadId;
