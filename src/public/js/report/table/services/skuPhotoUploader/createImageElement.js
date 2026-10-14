var createImageElement = (base64, skuName) => {
  var img = document.createElement("img");

  img.alt = "Загрузить";
  img.id = "img-" + skuName;
  img.className = "cell-photo";
  img.setAttribute("skuName", skuName);
  img.src = `data:image/png=;base64,${base64}`;

  return img;
};

export default createImageElement;
