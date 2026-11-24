var updateTaxSettingsFromLocalStorage = (item, key, newValue) => {
  var taxYear = JSON.parse(localStorage.getItem(item));
  taxYear[key] = newValue;
  localStorage.setItem(item, JSON.stringify(taxYear));
};

export default updateTaxSettingsFromLocalStorage;
