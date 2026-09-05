import parseJwt from "../services/parseJwt.js";
import isTestToken from "../services/isTestToken.js";
import checkTokenExpiry from "../services/checkTokenExpiry.js";
import isPresumablyJwtToken from "../services/isPresumablyJwtToken.js";

var tokenValidatorController = async (req, res, next) => {
  var token = req.body.token;

  if (!isPresumablyJwtToken(token)) {
    return res.sendStatus(401);
  }

  var tokenPayload = parseJwt(token);

  if (isTestToken(tokenPayload)) {
    return res.sendStatus(400);
  }

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return res.sendStatus(400);
  }

  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

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

  if (tokenAuthFailed) {
    return res.sendStatus(401);
  }

  req.body.tokenPayload = tokenPayload;

  next();
};

export default tokenValidatorController;
