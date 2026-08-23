import createDiv from "../utils/createDiv.js";

var createCostPricesListItem = (sku) => {
  var item = createDiv("last-cost-prices-modal__item");
  var name = createDiv("last-cost-prices-modal__name", sku.skuName);
  var costPrice = createDiv("last-cost-prices-modal__price", sku.lastCostPrice);

  name.setAttribute("skuName", "");
  costPrice.setAttribute("lastCostPrice", "");

  item.appendChild(name);
  item.appendChild(costPrice);

  return { item };
};

export default createCostPricesListItem;
