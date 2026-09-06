var MAX_ATTEMPTS = 5;
var EXPECTED_STATUS_CODE = 202;
var NEXT_REQUEST_INTERVAL_MS = 5000;
var url = process.env.REPORT_LOADER_URL_TO_RESUME_ABANDONED_LOADING;
var nextRequestDelay = async () => new Promise((res) => setTimeout(res, NEXT_REQUEST_INTERVAL_MS));

var doRequest = async (userId) =>
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.SECRET_KEY },
  });

var sendResumeAbandonedReportsLoadingRequest = async (userId) => {
  var attempt = 0;
  var success = false;

  while (attempt < MAX_ATTEMPTS) {
    try {
      var res = await doRequest(userId);
      if (res.status === EXPECTED_STATUS_CODE) {
        success = true;

        break;
      } else {
        attempt++;
      }
    } catch (e) {
      attempt++;
    }

    await nextRequestDelay();
  }

  return success;
};

export default sendResumeAbandonedReportsLoadingRequest;
