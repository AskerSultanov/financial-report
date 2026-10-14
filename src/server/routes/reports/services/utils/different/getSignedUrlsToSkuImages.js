import s3 from "../s3/index.js";

var getSignedUrlsToSkuImages = async (userId, skus) => {
  var signedUrls = [];

  for (var { skuName } of skus) {
    var skuIsExist = signedUrls.find((item) => item.skuName === skuName);

    if (!skuIsExist) {
      var objectKey = userId + ";" + skuName;

      var { signedUrl } = await s3.getFile(objectKey);

      if (signedUrl) {
        signedUrls.push({ skuName, signedUrl });
      }
    }
  }

  return { signedUrls };
};

export default getSignedUrlsToSkuImages;
