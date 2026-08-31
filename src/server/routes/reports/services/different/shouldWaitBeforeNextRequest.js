var oneMinuteMs = 60_000;

var shouldWaitBeforeNextRequest = (lastReportRequestTimestamp) => {
  var nextRequestDelayMs = 0;

  if (lastReportRequestTimestamp === 0) {
    return { nextRequestDelayMs };
  }

  var currentTimeMs = Date.now();
  var difference = currentTimeMs - lastReportRequestTimestamp;
  var hasMinutePassed = difference > oneMinuteMs;

  if (hasMinutePassed) {
    return { nextRequestDelayMs };
  }

  return { nextRequestDelayMs: oneMinuteMs - difference };
};

export default shouldWaitBeforeNextRequest;
