var calcTotalProductCosts = (skus) => skus.reduce((acc, sku) => acc + sku.qty * sku.costPrice, 0);

export default calcTotalProductCosts;
