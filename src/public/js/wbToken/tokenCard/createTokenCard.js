import doRequest from "../../utils/doRequest.js";
import { removeTokenCard } from "./removeTokenCard.js";

var createTokenCard = (userId, token) => {
  //  var { tokenHeader } = createTokenHeader(token.type);
  var { requiredTokenCategoriesGrid } = getTokenRequiredCategoriesGrid(
    token.type,
  );

  var { tokenCardInfo } = createTokenInfoBlock(token);
  var { tokenCategoriesGrid } = createTokenCategoriesGrid(token);
  var { tokenFooter } = createTokenFooter(userId, token.type);

  var tokenCard = document.createElement("div");
  tokenCard.id = token.type;
  tokenCard.className = "token-card card";

  tokenCard.append(
    // tokenHeader,
    // requiredTokenCategoriesGrid,
    tokenCardInfo,
    tokenCategoriesGrid,
    tokenFooter,
  );

  return { tokenCard };
};

export default createTokenCard;

var yes = "да";
var no = "нет";
var readOnlyEnding = "read";

var getTokenTypeBadgeText = (tokenType) =>
  tokenType === readOnlyEnding ? "Чтение" : "Чтение и запись";

var getTokenHeaderText = (ending) =>
  ending === readOnlyEnding
    ? "Токен для получения"
    : "Токен для установки цен на товары (опционально)";

var getTokenRequiredCategoriesGrid = (ending) => {
  var requiredTokenCategoriesGrid = document.createElement("div");
  requiredTokenCategoriesGrid.id = "required-token-categories";
  requiredTokenCategoriesGrid.className =
    "required-token-categories token-categories";

  var requiredTokenCategories =
    ending === readOnlyEnding
      ? `   <div class="categories-title">Необходимые категории</div>
            <span class="category-tag badge">Финансы</span>
            <span class="category-tag badge">Аналитика</span>
            <span class="category-tag badge">Продвижение</span
            ><span class="category-tag badge">Цены и скидки</span>
          `
      : `   <div class="categories-title">Необходимые категории</div>
            <span class="category-tag badge"> Цены и скидки</span>
          `;

  requiredTokenCategoriesGrid.innerHTML = requiredTokenCategories;

  return { requiredTokenCategoriesGrid };
};

var readTokenTasks = `
                  <li>списка товаров</li>
                  <li>еженедельного фин. отчета</li>
                  <li>отчета о платном хранении</li>
                  <li>отчета о затратах на рекламу</li>
                `;

var createTokenHeader = function (ending) {
  var tokenName = document.createElement("div");
  tokenName.className = "token-name";
  tokenName.textContent = getTokenHeaderText(ending);

  if (ending === readOnlyEnding) {
    var readTokenTasksList = document.createElement("ul");
    readTokenTasksList.innerHTML = readTokenTasks;

    tokenName.append(readTokenTasksList);
  }

  var tokenNameGroup = document.createElement("div");
  tokenNameGroup.className = "token-name-group";
  tokenNameGroup.id = "token-name-group-" + ending;
  tokenNameGroup.append(tokenName);

  var tokenHeader = document.createElement("div");
  tokenHeader.className = "token-header";

  tokenHeader.append(tokenTypeBadge);

  return { tokenHeader };
};

var createTokenInfoBlock = function (token) {
  var {
    addedAt,
    lastUsed,
    daysLeft,
    expiredToday,
    isExpired,
    validUntil,
    type,
  } = token;

  var addedAtElem = document.createElement("span");
  addedAtElem.className = "info-item";
  addedAtElem.innerHTML = `<span class="label">Сохранен:</span><span class="value" id="added-at-${type}">${addedAt}</span>`;

  var lastUsedElem = document.createElement("span");
  lastUsedElem.className = "info-item";
  lastUsedElem.innerHTML = `<span class="label">Использовался:</span><span class="value" id="last-used-${type}">${lastUsed || "-"}</span>`;

  var daysLeftElem = document.createElement("span");
  daysLeftElem.className = "info-item";
  daysLeftElem.innerHTML = `<span class="label">Осталось дней:</span><span class="value" id="days-left-${type}">${daysLeft}</span>`;

  var isExpiredElem = document.createElement("span");
  isExpiredElem.className = "info-item";
  isExpiredElem.innerHTML = `<span class="label">Просрочен:</span><span class="value" id="is-expired-${type}">${isExpired ? yes : no}</span>`;

  var expiredTodayElem = document.createElement("span");
  expiredTodayElem.className = "info-item";
  expiredTodayElem.innerHTML = `<span class="label">Срок истекает сегодня:</span><span class="value" id="expired-today-${type}">${expiredToday ? yes : no}</span>`;

  var validUntilElem = document.createElement("span");
  validUntilElem.className = "info-item";
  validUntilElem.innerHTML = `<span class="label">Годен до:</span><span class="value" id="valid-until-${type}">${validUntil}</span>`;

  var tokenCardInfo = document.createElement("div");
  tokenCardInfo.className = "token-info";
  tokenCardInfo.id = "token-info-" + type;

  var tokenTypeBadge = document.createElement("div");
  tokenTypeBadge.className = "token-type-badge badge " + token.type;
  tokenTypeBadge.textContent = getTokenTypeBadgeText(token.type);

  tokenCardInfo.append(
    tokenTypeBadge,
    isExpiredElem,
    daysLeftElem,
    validUntilElem,
    expiredTodayElem,
    addedAtElem,
    lastUsedElem,
  );

  return { tokenCardInfo };
};

var createTokenCategoriesGrid = function (token) {
  var tokenCategoriesGrid = document.createElement("div");
  tokenCategoriesGrid.className = "token-categories";
  tokenCategoriesGrid.id = "token-categories-" + token.type;

  var tokenCategoriesGridTitle = document.createElement("div");
  tokenCategoriesGridTitle.className = "categories-title";
  tokenCategoriesGridTitle.textContent = "Категории из токена";

  for (var category of token.categories) {
    var categoryTagElem = document.createElement("span");
    categoryTagElem.textContent = category;
    categoryTagElem.className = "category-tag badge";

    tokenCategoriesGrid.append(categoryTagElem);
  }

  return { tokenCategoriesGrid };
};

var createRemoveTokenBtn = (userId, tokenType, url = "/wbtoken/") => {
  var button = document.createElement("button");

  button.className = "btn-delete button-danger";
  button.id = "btn-delete-" + tokenType;
  button.textContent = "Удалить";

  button.addEventListener("click", async () => {
    var confirmed = confirm("Удалить токен ?");

    if (confirmed) {
      try {
        var res = await doRequest(url, {
          method: "DELETE",
          body: JSON.stringify({ userId, tokenType }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          removeTokenCard(tokenType);

          alert("Токен успешно удален");
        } else {
          alert("Не удалось удалить токен");
        }
      } catch (e) {
        alert("Произошла ошибка при попытке удалить токен...");
      }
    }
  });

  return { removeBtn: button };
};

var createTokenFooter = function (userId, tokenType) {
  var tokenFooter = document.createElement("div");
  tokenFooter.className = "token-footer";

  var { removeBtn } = createRemoveTokenBtn(userId, tokenType);

  tokenFooter.append(removeBtn);
  return { tokenFooter };
};
