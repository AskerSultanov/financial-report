var promoTitleStartsWith = "Тест";
var unusedPromoName = "Распродажа в счет долга";

var getPromotionList = async (token, startDateTime, endDateTime, allPromo = true) => {
  var url = `https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions?startDateTime=${startDateTime}&endDateTime=${endDateTime}&allPromo=${allPromo}`;

  var res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });

  if (res.status === 200) {
    var { data } = await res.json();
    var promotionList = data.promotions.filter((promo) => promo.name !== unusedPromoName && !promo.name.startsWith(promoTitleStartsWith));
    return { promotionList, errorText: "" };
  } else {
    var { errorText } = await res.json();
    return { promotionList: [], errorText };
  }
};

export default getPromotionList;
