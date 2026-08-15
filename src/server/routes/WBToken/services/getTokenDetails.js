var millisecondsInOneSec = 1000;
var millisecondsInDay = 86_400_000;
var mskTimeOffsetInMs = 10_800_000;
var monthList = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

var getTokenDetails = (token) => {
  var { exp, id } = token;

  var expInMilliseconds = exp * millisecondsInOneSec;
  var isExpired = currentTimestamp > expInMilliseconds;
  var currentTimestamp = Date.now() + mskTimeOffsetInMs;

  var daysLeft;

  if (isExpired) {
    daysLeft = "-";
  } else {
    var difference = expInMilliseconds - currentTimestamp;
    var daysLeft = difference / millisecondsInDay;
    daysLeft = daysLeft.toString().split(".")[0]; //truncate days
  }

  var currentDate = new Date(currentTimestamp).toISOString();
  var currentDateWithoutHour = currentDate.split("T")[0];

  var dateFromExp = new Date(expInMilliseconds).toISOString();
  var dateFromExpWithoutHour = dateFromExp.split("T")[0];

  var [year, monthNum, day] = dateFromExpWithoutHour.split("-");
  var monthIndex = monthNum - 1;

  var validUntil = `${day} ${monthList[monthIndex]} ${year}`;

  var expiredToday = false;

  if (dateFromExpWithoutHour === currentDateWithoutHour) {
    expiredToday = true;
  }

  return { id, daysLeft, validUntil, isExpired, expiredToday, tokenIsExist: true };
};

export default getTokenDetails;
