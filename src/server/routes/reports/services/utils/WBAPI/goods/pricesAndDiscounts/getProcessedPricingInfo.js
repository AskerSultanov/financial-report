import { WBAPIError } from "../../../../../../../customError/index.js";

var getProcessedPricingInfo = async (userId, uploadID, token) => {
  var url = `https://discounts-prices-api.wildberries.ru/api/v2/history/tasks?uploadID=${uploadID}`;
  var options = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  var res = await fetch(url, options);

  var { data, errorText } = await res.json();

  if (res.status === 200) {
    return data;
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос\nДетали:" + errorText;
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для получения состояния необработанной загрузки с помощью сохраненного токена\nДетали:" +
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
        "Подождите минуту перед получением состояния необработанной загрузки\nДетали:" +
        errorText;
      break;
    default:
      errMsg =
        "Возникла ошибка при получении состояния необработанной загрузки, попробуйте позже\nДетали:" +
        errorText;
  }

  throw new WBAPIError(userId, 400, errMsg);
};

export default getProcessedPricingInfo;
