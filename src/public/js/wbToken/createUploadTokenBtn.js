import doRequest from "../utils/doRequest.js";
import createTokenCard from "./tokenCard/createTokenCard.js";
import isPresumablyJwtToken from "./isPresumablyJwtToken.js";
import { updateTokenCardInfo } from "./tokenCard/updateTokenCardInfo.js";
import { updateTokenCategoriesToGrid } from "./tokenCard/updateTokenCategoriesToGrid.js";

var tokenCardContainer = document.getElementById("token-card-container");

var createUploadTokenBtn = (userId, input, modal) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  button.onclick = uploadTokenBtnHandler;

  return button;

  async function uploadTokenBtnHandler() {
    if (input.value.length < 1) {
      return alert("Нельзя отправить пустое поле");
    }

    var token = input.value;

    try {
      if (!isPresumablyJwtToken(token)) {
        alert("Токен не валиден");
        input.value = "";
        return;
      }

      var res = await doRequest("/wbtoken", {
        method: "POST",
        body: JSON.stringify({ userId, token }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        modal.remove();
        setTimeout(() => alert("Токен успешно сохранен"));

        var { tokenDetails } = await res.json();

        var tokenCardExist = document.getElementById(tokenDetails.type);

        if (tokenCardExist) {
          updateTokenCardInfo(tokenDetails);
          updateTokenCategoriesToGrid(tokenDetails);
          return;
        }

        var { tokenCard } = createTokenCard(userId, tokenDetails);

        tokenCardContainer.append(tokenCard);
      } else if (res.status === 409) {
        alert("Токен совпадает с предыдущим");
        input.value = "";
      } else if (res.status === 400) {
        var { errorText } = await res.json();
        alert(errorText);
        input.value = "";
      } else if (res.status === 401) {
        alert("Токен не валиден");
        input.value = "";
      } else {
        alert("Произошла ошибка при попытке сохранить токен ...");
        input.value = "";
      }
    } catch (e) {
      console.log(e);
      alert("Что-то пошло не так ...");
      modal.remove();
      return;
    }
  }
};

export default createUploadTokenBtn;
