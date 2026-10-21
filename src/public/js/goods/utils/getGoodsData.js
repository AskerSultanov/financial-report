import doRequest from "../../utils/doRequest.js";

var getGoodsData = async (userId) => {
  var url = "/goods/api/" + userId;

  var res = await doRequest(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods, weeklyPricesAndDiscounts } = await res.json();

  return { listGoods, weeklyPricesAndDiscounts };
};

export default getGoodsData;
