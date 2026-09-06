import { WBAPIError } from "../../../../../../../customError/index.js";

var getPricesAndDiscountsByListGoods = async (userId, token, nmList) => {
  var url =
    "https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter";
  var options = {
    method: "POST",
    body: JSON.stringify({ nmList }),
    headers: { Authorization: "Bearer " + token },
  };

  var res = await fetch(url, options);
  var { data, errorText } = await res.json();

  if (res.status === 200) {
    var { listGoods } = data;
    return { rawListGoods: listGoods };
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос\nДетали:" + errorText;
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для получения списка товаров по артикулам с помощью сохраненного токена\nДетали:" +
        errorText;
      break;
    case 402:
      errMsg = "Требуется платеж\nДетали:" + errorText;
      break;
    case 403:
      errMsg = "Доступ запрещен\nДетали:" + errorText;
      break;
    case 429:
      errMsg =
        "Подождите минуту перед получением списка товаров по артикулам\nДетали:" +
        errorText;
      break;
    default:
      errMsg =
        "Возникла ошибка при получении списка товаров по артикулам, попробуйте позже\nДетали:" +
        errorText;
  }

  throw new WBAPIError(userId, 400, errMsg);
};

export default getPricesAndDiscountsByListGoods;
