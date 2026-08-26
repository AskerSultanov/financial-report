var msInSec = 1000;
var mskTimeOffsetInSec = 10_800;

var checkTokenExpiry = (tokenPayload) => {
  var currentTimestamp = Date.now() + mskTimeOffsetInSec;

  if (!tokenPayload?.exp) {
    return;
  }

  return tokenPayload.exp * msInSec <= currentTimestamp;
};

export default checkTokenExpiry;
