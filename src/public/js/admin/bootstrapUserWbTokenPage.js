import navigateTo from "../utils/navigateTo.js";
import getTokenData from "../wbToken/getTokenData.js";
import createTokenCard from "../wbToken/tokenCard/createTokenCard.js";
import uploadTokenModalHandler from "../wbToken/uploadTokenModalHandler.js";

var userId = window.location.pathname.split("/").at(-1);
var tokenCardContainer = document.getElementById("token-card-container");
var btnBackToMainPage = document.getElementById("back-to-main-page-btn");

var bootstrapUserWbTokenPage = async () => {
  var { tokensDetails } = await getTokenData(userId);

  tokensDetails.forEach((token) => {
    var { tokenCard } = createTokenCard(userId, token);
    tokenCardContainer.append(tokenCard);
  });

  uploadTokenModalHandler(userId);

  btnBackToMainPage.onclick = () => {
    var url = "/admin/user/" + userId;
    navigateTo(url);
  };
};

bootstrapUserWbTokenPage();
