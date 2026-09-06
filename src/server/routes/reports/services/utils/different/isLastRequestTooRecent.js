var isLastRequestTooRecent = (
  lastReportRequestTimestamp,
  nestReportDelayMs = 65_000,
) => {
  var delayInMs = 0;

  var currentTimestamp = Date.now();

  var difference = currentTimestamp - lastReportRequestTimestamp;

  var needToDelay = difference < nestReportDelayMs;

  if (needToDelay) {
    delayInMs = nestReportDelayMs - difference;
  }

  return { needToDelay, delayInMs };
};

export default isLastRequestTooRecent;
