import parseJwt from "../../WBToken/services/parseJwt.js";
import isPresumablyJwtToken from "../../WBToken/services/isPresumablyJwtToken.js";

var mskTimeOffsetInMs = 10_800_000;

var tokenValidator = async (req, res) => {
  var token = req.body.token;

  if (!token) {
    return res.sendStatus(400);
  }

  if (!isPresumablyJwtToken(token)) {
    return res.sendStatus(400);
  }

  var currentTimestamp = Date.now() + mskTimeOffsetInMs;
  var options = { method: "GET", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } };

  var responses = await Promise.all([
    fetch("https://advert-api.wildberries.ru/ping", options),
    fetch("https://statistics-api.wildberries.ru/ping", options),
    fetch("https://seller-analytics-api.wildberries.ru/ping", options),
    fetch("https://discounts-prices-api.wildberries.ru/ping", options),
  ]);

  var tokenAuthFailed = false;

  for (var response of responses) {
    var status = (await response.json())?.Status;

    if (status !== "OK") {
      tokenAuthFailed = true;
      break;
    }
  }

  var tokenPayload = parseJwt(token);
  var tokenIsExpired = tokenPayload?.exp * 1000 <= currentTimestamp;

  if (tokenAuthFailed || tokenIsExpired) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};
export default tokenValidator;
