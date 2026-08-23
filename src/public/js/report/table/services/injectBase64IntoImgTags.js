var injectBase64IntoImgTags = (imageCollection) => {
  for (var { skuName, base64 } of imageCollection) {
    if (base64) {
      var deleteImgButton = document.getElementById("delete-img-button-" + skuName);

      if (deleteImgButton) {
        deleteImgButton.style.display = "block";
      }
    }

    var imgTagId = "img-" + skuName;

    if (img) {
      var src = `data:image/png;base64,${base64}`;

      var img = document.getElementById(imgTagId);
      img.style.display = "block";
      img.src = src;
      img.height = 75;
      img.width = 90;
      var spanTagId = "span-" + skuName;
      var span = document.getElementById(spanTagId);
      span.style.display = "none";
    }
  }
};

export default injectBase64IntoImgTags;
