var mergeListGoodsWithWeeklyPricesAndDiscounts = (listGoods, weeklyPricesAndDiscounts) => {
  var mergedData = [];
  var activeSkus = listGoods.filter((sku) => !sku.deleted && !sku.disabled);

  for (var { id, skuName, price, discount } of activeSkus) {
    var weeklyPrices = [];
    var weeklyDiscounts = [];

    if (!weeklyPricesAndDiscounts.length) {
      weeklyPrices.length = 7;
      weeklyPrices.fill(price);
      weeklyDiscounts.length = 7;
      weeklyDiscounts.fill(discount);
    } else {
      for (var day of weeklyPricesAndDiscounts) {
        var skuPriceAndDiscountOfDay = day.find((item) => item.nmID === id)?.data;
        if (!skuPriceAndDiscountOfDay) {
          weeklyPrices.push(price);
          weeklyDiscounts.push(discount);
        } else {
          weeklyPrices.push(skuPriceAndDiscountOfDay.price);
          weeklyDiscounts.push(skuPriceAndDiscountOfDay.discount);
        }
      }
    }

    mergedData.push({ id, skuName, weeklyPrices, weeklyDiscounts });
  }

  return { mergedData };
};

export default mergeListGoodsWithWeeklyPricesAndDiscounts;
