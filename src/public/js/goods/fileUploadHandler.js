var sendUploadFile = async (file) => {
  var url = "/goods/prices-discounts/upload/";

  var res = await fetch(url, {
    method: "POST",
    body: file,
  });

  if (!res.ok) {
    alert("Произошла ошибка при загрузке документа");
    return;
  }

  var { weeklyPricesAndDiscounts } = await res.json();
  alert("Цены успешно установлены");

  return { weeklyPricesAndDiscounts };
};

var input = document.getElementById("input-field");
var button = document.getElementById("upload-weekly-prices-and-discounts-file");

var fileUploadHandler = (userId) => {
  button.onclick = (e) => {
    alert("Пока недоступно");
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

      await sendUploadFile(uploadFormData);
    };
  };
};

export default fileUploadHandler;
