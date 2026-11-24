import getTokenData from "./getTokenData.js";
import createTokenCard from "./tokenCard/createTokenCard.js";
import uploadTokenModalHandler from "./uploadTokenModalHandler.js";

var tokenCardContainer = document.getElementById("token-card-container");

var bootstrapWBTokenPage = async (userId) => {
  var { tokensDetails } = await getTokenData(userId);

  tokensDetails.forEach((token) => {
    var { tokenCard } = createTokenCard(userId, token);
    tokenCardContainer.append(tokenCard);
  });

  uploadTokenModalHandler(userId);
};

export default bootstrapWBTokenPage;
