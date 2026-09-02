var isLastRequestTooRecent = (lastReportRequestTimestamp, nestReportDelayMs = 65_000) => {
  var delayInMs = 0;

  var currentTimestamp = Date.now();

  var difference = currentTimestamp - lastReportRequestTimestamp;

  var needToDalay = difference < nestReportDelayMs;

  if (needToDalay) {
    delayInMs = nestReportDelayMs - difference;
  }

  return { needToDalay, delayInMs };
};

export default isLastRequestTooRecent;
