var getListGoodsForPromotion = async (token, promoId, inAction = true, limit = 1000, offset = 0) => {
  var url = `https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/nomenclatures?promotionID=${promoId}&inAction=${inAction}&offset=${offset}&limit=${limit}`;
  var res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });

  if (res.status === 200) {
    var { data } = await res.json();
    return { listGoodsForPromotion: data.nomenclatures, errorText: "" };
  } else {
    var { errorText } = await res.json();
    return { listGoodsForPromotion: [], errorText };
  }
};

export default getListGoodsForPromotion;
