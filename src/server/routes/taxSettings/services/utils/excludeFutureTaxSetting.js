var excludeFutureTaxSetting = (taxSetting) => {
  var currentYear = new Date().getFullYear();
  var filteredTaxSettings = taxSetting.filter(
    (item) => item.year <= currentYear,
  );
  return { filteredTaxSettings };
};

export default excludeFutureTaxSetting;
