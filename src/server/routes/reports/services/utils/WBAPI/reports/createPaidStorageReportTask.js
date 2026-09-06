import { WBAPIError } from "../../../../../../customError/index.js";

var createPaidStorageReportTask = async (dateFrom, dateTo, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.status === 200) {
    var { data } = await res.json();

    return { taskId: data.taskId };
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для создания отчета о платном хранении с помощью сохраненного токена";
      break;
    case 429:
      errMsg = "Подождите минуту перед получением нового отчёта";
      break;
    default:
      errMsg =
        "Возникла ошибка при получении отчета о платном хранении, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

export default createPaidStorageReportTask;
