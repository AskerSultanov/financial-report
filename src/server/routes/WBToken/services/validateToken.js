import parseJwt from "./utils/parseJwt.js";
import isTestToken from "./utils/isTestToken.js";
import checkTokenExpiry from "./utils/checkTokenExpiry.js";
import isPresumablyJwtToken from "./utils/isPresumablyJwtToken.js";

var validateTokenService = async (token) => {
  var tokenIsValid = false;

  if (!isPresumablyJwtToken(token)) {
    return { tokenIsValid, tokenPayload: {} };
  }

  var tokenPayload = parseJwt(token);

  if (isTestToken(tokenPayload)) {
    return { tokenIsValid, tokenPayload: {} };
  }

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return { tokenIsValid, tokenPayload: {} };
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
    return { tokenIsValid, tokenPayload: {} };
  }

  return { tokenIsValid: true, tokenPayload };
};

export default validateTokenService;
