import { WBAPIError } from "../../../../../../../customError/index.js";

var setPricesAndDiscounts = async (userId, token, weeklyPricesAndDiscounts) => {
  var url = "https://discounts-prices-api.wildberries.ru/api/v2/upload/task";

  var options = {
    method: "POST",
    body: JSON.stringify({ data: weeklyPricesAndDiscounts }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  var res = await fetch(url, options);
  var { data, errorText } = await res.json();

  if (res.status === 200 || res.status === 208) {
    var { id, alreadyExists } = data;
    return { id, alreadyExists };
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос\nДетали:" + errorText;
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для установки цен на товары\nДетали:" +
        errorText;
      break;
    case 402:
      errMsg = "Требуется платеж\nДетали:" + errorText;
      break;
    case 403:
      errMsg = "Доступ запрещен\nДетали:" + errorText;
      break;
    case 422:
      errMsg =
        "Неожиданный результат при уставновке цен на товары\nДетали:" +
        errorText;
    case 429:
      errMsg =
        "Подождите минуту перед установкой новых цен на товары\nДетали:" +
        errorText;
      break;
    default:
      errMsg =
        "Возникла ошибка при уставновке цен на товары, попробуйте позже\nДетали:" +
        errorText;
  }

  throw new WBAPIError(userId, 400, errMsg);
};

export default setPricesAndDiscounts;
