var msInSec = 1000;

var checkTokenExpiry = (tokenPayload) => {
  var tokenExp = tokenPayload?.exp;

  if (!tokenExp || typeof tokenExp !== "number" || isNaN(tokenExp)) {
    throw new Error(
      "Invalid WBTOKEN payload: exp property is missing or invalid",
    );
  }

  var currentTimestamp = Date.now();

  var isExpired = tokenExp * msInSec <= currentTimestamp;

  return { isExpired };
};

export default checkTokenExpiry;
