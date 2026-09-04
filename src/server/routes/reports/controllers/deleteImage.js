import s3 from "../services/s3/index.js";

var deleteImageController = async (req, res, next) => {
  var { userId, skuName } = req.body;
  var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;
  var success = await s3.deleteFile(objectKey);
  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default deleteImageController;
