var taxAmount = (taxableAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var tax = (taxableAmount * taxRate) / 100;

  return tax;
};

export default taxAmount;
