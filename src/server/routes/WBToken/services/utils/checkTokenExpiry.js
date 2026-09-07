var msInSec = 1000;

var checkTokenExpiry = (tokenPayload) => {
  var currentTimestamp = Date.now();

  var isExpired = tokenPayload.exp * msInSec <= currentTimestamp;

  return { isExpired };
};

export default checkTokenExpiry;
