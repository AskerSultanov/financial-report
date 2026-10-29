import getTokenData from "./getTokenData.js";
import getCookieByName from "../utils/getCookieByName.js";
import createTokenCard from "./tokenCard/createTokenCard.js";
import uploadTokenModalHandler from "./uploadTokenModalHandler.js";
import getMainPageButtonHandler from "../taxParams/getMainPageButtonHandler.js";

var userId = getCookieByName("userId");
var tokenCardContainer = document.getElementById("token-card-container");

var main = async () => {
  var { tokensDetails } = await getTokenData(userId);

  tokensDetails.forEach((token) => {
    var { tokenCard } = createTokenCard(userId, token);
    tokenCardContainer.append(tokenCard);
  });

  uploadTokenModalHandler(userId);
};

main();
getMainPageButtonHandler();
