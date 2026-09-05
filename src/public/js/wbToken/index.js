import getTokenData from "./getTokenData.js";
import renameSaveButton from "./renameSaveButton.js";
import loadTokenButtonHander from "./loadTokenButtonHander.js";
import { insertDataToTokenDataTable } from "./tokenDataTable.js";
import removeTokenButtonHandler from "./removeTokenButtonHandler.js";
import { enableTokenDataTable } from "./toggleVisibilityOfTokenDataTable.js";
import { enableRemoveTokenButton } from "./toggleVisibilityOfRemoveTokenButton.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { tokenDetails, tokenIsExist } = await getTokenData(userId);

  if (tokenIsExist) {
    renameSaveButton();
    enableTokenDataTable();
    enableRemoveTokenButton();
    insertDataToTokenDataTable(tokenDetails);

    removeTokenButtonHandler(userId);
  }

  loadTokenButtonHander(userId);
};

main();
