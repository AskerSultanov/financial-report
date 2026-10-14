import createDeleteImgButton from "./skuPhotoUploader/createDeleteImgButton.js";

var injectSignedUrlsIntoImgTags = (userId, signedUrls) => {
  for (var { skuName, signedUrl } of signedUrls) {
    var imageElements = document.querySelectorAll(`img[skuName="${skuName}"]`);
    var spanElements = document.querySelectorAll(`span[skuName="${skuName}"]`);
    var imageContainers = document.querySelectorAll(
      `div[skuName="${skuName}"]`,
    );

    for (var span of spanElements) {
      span.style.display = "none";
    }

    for (var image of imageElements) {
      image.width = 90;
      image.height = 75;
      image.src = signedUrl;
      image.style.display = "block";
    }

    for (var container of imageContainers) {
      var deleteImageButton = createDeleteImgButton(userId, skuName);

      deleteImageButton.style.display = "block";

      container.append(deleteImageButton);
    }
  }
};

export default injectSignedUrlsIntoImgTags;
