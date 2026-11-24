var writeTaxSettingsToLocalStorage = (taxSetting) => {
  for (var item of taxSetting) {
    localStorage.setItem(item.year, JSON.stringify(item));
  }
};

export default writeTaxSettingsToLocalStorage;
