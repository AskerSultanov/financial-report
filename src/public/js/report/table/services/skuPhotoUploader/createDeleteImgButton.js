import doRequest from "../../../../utils/doRequest.js";

var createDeleteImgButton = (userId, skuName) => {
  var button = document.createElement("button");

  button.type = "button";
  button.title = "Удалить фото";
  button.style.display = "none";
  button.className = "delete-img-button";
  button.setAttribute("skuName", skuName);
  button.id = "delete-img-button-" + skuName;
  button.setAttribute("aria-label", "Удалить фото SKU " + skuName);

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var objectKey = userId + ";" + skuName;

    var res = await doRequest("/report/image/", {
      method: "DELETE",
      body: JSON.stringify({ objectKey }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 204) {
      var imageElements = document.querySelectorAll(
        `img[skuName="${skuName}"]`,
      );
      var btnElements = document.querySelectorAll(
        `button[skuName="${skuName}"]`,
      );

      for (var image of imageElements) {
        image.src = null;
      }

      for (var deleteImgButton of btnElements) {
        deleteImgButton.style.display = "none";
      }
    } else {
      alert("Не удалось удалить фото.\nПопробуйте еще раз.");
    }
  });

  return button;
};

export default createDeleteImgButton;
