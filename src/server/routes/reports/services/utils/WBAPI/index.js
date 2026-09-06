import getReports from "./reports/index.js";
import getListGoods from "./goods/goodsInfo/getGoodsListFromWBAPI.js";
import setPricesAndDiscounts from "./goods/pricesAndDiscounts/setPriceAndDiscount.js";
import getPriceUploadDetails from "./goods/pricesAndDiscounts/getPriceUploadDetails.js";
import getProcessedPricingInfo from "./goods/pricesAndDiscounts/getProcessedPricingInfo.js";
import getPricesAndDiscountsByListGoods from "./goods/pricesAndDiscounts/getPricesAndDiscountsByListGoods.js";

export default { getReports, getListGoods, setPricesAndDiscounts, getPriceUploadDetails, getProcessedPricingInfo, getPricesAndDiscountsByListGoods };
