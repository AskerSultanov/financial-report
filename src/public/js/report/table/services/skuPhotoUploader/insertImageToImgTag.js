var insertImageToImgTag = (event, skuName) => {
  var file = event.target.files[0];

  var reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    var imageElements = document.querySelectorAll(`img[skuName="${skuName}"]`);
    var spanElements = document.querySelectorAll(`span[skuName="${skuName}"]`);
    var btnElements = document.querySelectorAll(`button[skuName="${skuName}"]`);

    for (var span of spanElements) {
      span.style.display = "none";
    }

    for (var image of imageElements) {
      image.src = e.target.result;
      image.style.display = "block";
    }

    for (var deleteImgButton of btnElements) {
      deleteImgButton.style.display = "block";
    }
  });
};

export default insertImageToImgTag;
