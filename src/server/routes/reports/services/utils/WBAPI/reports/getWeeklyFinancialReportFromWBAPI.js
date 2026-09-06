import { WBAPIError } from "../../../../../../customError/index.js";

var requriedFields = [
  "nmId",
  "rrdId",
  "forPay",
  "dateTo",
  "saleDt",
  "quantity",
  "reportId",
  "penalty",
  "dateFrom",
  "vendorCode",
  "deduction",
  "reportType",
  "paidStorage",
  "retailPrice",
  "docTypeName",
  "retailAmount",
  "deliveryService",
  "paidAcceptance",
  "additionalPayment",
];

var period = "weekly";
var MAX_NUMBERS_OF_ROWS = 100_000;
var NEXT_REQUEST_DELAY_MS = 65_000;
var url =
  "https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed";
var nextRequestDelay = async () =>
  new Promise((res) => setTimeout(res, NEXT_REQUEST_DELAY_MS));

var doRequest = async (token, dateFrom, dateTo, period, rrdId, limit) =>
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      dateFrom,
      dateTo,
      period,
      rrdId,
      limit,
      fields: requriedFields,
    }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

var getWeeklyFinancialReportFromWBAPI = async (
  dateFrom,
  dateTo,
  token,
  userId,
) => {
  var defaultRowNumber = 0;

  var res = await doRequest(
    token,
    dateFrom,
    dateTo,
    period,
    defaultRowNumber,
    MAX_NUMBERS_OF_ROWS,
  );

  if (res.status === 200) {
    var report = await res.json();

    var reportRowCount = report.length;

    if (reportRowCount > MAX_NUMBERS_OF_ROWS) {
      var needRetryRequest = true;

      var lastRowId = report[report.length - 1].rrdId;
      defaultRowNumber = lastRowId;

      var remainingReportPart = [];

      while (needRetryRequest) {
        await nextRequestDelay();

        var res = await doRequest(
          token,
          dateFrom,
          dateTo,
          period,
          defaultRowNumber,
          MAX_NUMBERS_OF_ROWS,
        );

        if (res.status === 200) {
          remainingReportPart = await res.json();

          lastRowId = remainingReportPart[remainingReportPart.length - 1].rrdId;
          defaultRowNumber = lastRowId;

          report.push(...remainingReportPart);
        } else if (res.status === 204) {
          needRetryRequest = false;
          break;
        }
      }
    }

    return report;
  } else if (res.status === 204) {
    return [];
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg = "Не удалось авторизоваться с помощью сохраненного токена";
      break;
    case 429:
      errMsg = "Подождите минуту перед получением нового отчёта";
      break;
    case 402:
      errMsg = "Требуется платеж";
      break;
    default:
      errMsg =
        "Возникла ошибка при получении финансового отчета, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

export default getWeeklyFinancialReportFromWBAPI;
