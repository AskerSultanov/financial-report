import doRequest from "../utils/doRequest.js";

var url = "/goods/prices-discounts/upload/";

var sendUploadFile = async (file) => {
  var res = await doRequest(url, {
    method: "POST",
    body: file,
  });

  var { infoText, weeklyPricesAndDiscounts } = await res.json();

  if (infoText) {
    alert(infoText);
  } else {
    alert("Цены успешно установлены");
  }

  return { weeklyPricesAndDiscounts };
};

var input = document.getElementById("input-field");
var button = document.getElementById("upload-weekly-prices-and-discounts-file");

var uploadWeelkyPricesAndDiscountsFileButtonHandler = (userId) => {
  button.onclick = (e) => {
    alert("Скоро будет доступно");
    return;

    e.preventDefault();
    input.click();

    input.onchange = async () => {
      var uploadFormData = new FormData();

      if (input.files.length > 1) {
        alert("Одновременно можно загрузить не больше 1 файла");
        return;
      }

      uploadFormData.append("userId", userId);
      uploadFormData.append("file", input.files[0]);

      var { weeklyPricesAndDiscounts } = await sendUploadFile(uploadFormData);
    };
  };
};

export default uploadWeelkyPricesAndDiscountsFileButtonHandler;
