import { WBAPIError } from "../../../../../../customError/index.js";

var getPaidStorageReportByTaskIdFromWBAPI = async (taskId, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`;

  var res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.status === 204) {
    return [];
  }

  if (res.ok) {
    var paidStorageReport = await res.json();

    return paidStorageReport;
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для получения отчета о платном хранении с помощью сохраненного токена";
      break;
    case 429:
      errMsg =
        "Подождите минуту перед получением нового отчёта о платном хранении";
      break;
    case 402:
      errMsg = "Требуется платеж";
      break;
    default:
      errMsg =
        "Возникла ошибка при получении отчета о платном хранении, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

export default getPaidStorageReportByTaskIdFromWBAPI;
