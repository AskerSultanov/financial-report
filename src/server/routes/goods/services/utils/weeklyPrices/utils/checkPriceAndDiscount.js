var checkPriceAndDiscount = (price, discount) => {
  if (!price || price <= 0) {
    return;
  }

  if (!discount || discount < 0) {
    return;
  }

  if (price <= discount) {
    return;
  }

  return true;
};

export default checkPriceAndDiscount;
