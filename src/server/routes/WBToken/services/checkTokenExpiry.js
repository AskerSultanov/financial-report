var msInSec = 1000;

var checkTokenExpiry = (tokenPayload) => {
  if (!tokenPayload?.exp) {
    throw new Error("Invalid WBTOKEN: payload is missing");
  }

  var currentTimestamp = Date.now();

  var isExpired = tokenPayload.exp * msInSec <= currentTimestamp;

  return { isExpired };
};

export default checkTokenExpiry;
