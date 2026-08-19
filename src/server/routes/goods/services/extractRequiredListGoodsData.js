var extractRequiredListGoodsData = async (rawListGoods) => {
  var listGoods = rawListGoods.map((item) => {
    return {
      id: item.nmID,
      skuName: item.vendorCode,
      price: item.sizes[0].price,
      discount: item.discount,
      discountedPrice: item.sizes[0].discountedPrice,
      clubDiscountedPrice: item.sizes[0].clubDiscountedPrice,
    };
  });

  return { listGoods };
};

export default extractRequiredListGoodsData;
