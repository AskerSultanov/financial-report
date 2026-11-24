var getSelectedYearTaxSettingFromLocalStorage = (item) => {
  var selectedYearTaxSettings= JSON.parse(localStorage.getItem(item));
  return { selectedYearTaxSettings};
};

export default getSelectedYearTaxSettingFromLocalStorage;
