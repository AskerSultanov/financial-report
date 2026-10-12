var calcBaseAndRemainder = (value, skuQty) => {
  var sign = value < 0 ? -1 : 1;
  var totalValueCents = Math.round(Math.abs(value) * 100);

  var baseCents = Math.floor(totalValueCents / skuQty);

  var remainderCents = totalValueCents - baseCents * skuQty;

  return {
    baseCents: sign * baseCents,
    remainderCents: sign * remainderCents,
  };
};

export default calcBaseAndRemainder;
