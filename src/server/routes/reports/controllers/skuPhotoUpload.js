import s3 from "../services/s3/index.js";

var skuPhotoUploadController = async (req, res, next) => {
  var { skuName } = req.body;

  var buffer = req.file.buffer;
  var userId = req.app.locals.userId;
  var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;
  var { httpStatusCode } = await s3.uploadFile(objectKey, buffer);
  return res.sendStatus(httpStatusCode);
};

export default skuPhotoUploadController;
