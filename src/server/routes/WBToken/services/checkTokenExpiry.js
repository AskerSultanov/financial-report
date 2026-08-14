import parseJwt from "./parseJwt.js";

var checkTokenExpiry = (token) => {
  var payload = parseJwt(token);
  var currentTimestamp = Date.now() + 3 * 60 * 60;

  return !payload?.exp || payload.exp * 1000 <= currentTimestamp;
};

export default checkTokenExpiry;
