var checkTaxRate = (taxRate) => {
  if (typeof taxRate === "number" && !isNaN(taxRate) && taxRate >= 0 && taxRate <= 100) {
    return { taxRate };
  }

  alert("Введите корректный процент налогообложения");
  throw new Error("Введите корректный процент налогообложения");
};

export default checkTaxRate;
