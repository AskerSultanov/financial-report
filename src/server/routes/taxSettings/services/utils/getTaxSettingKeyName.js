var getTaxSettingKeyName = (data) => {
  var taxSettingKeyName = Object.keys(data)[0];
  return { taxSettingKeyName };
};

export default getTaxSettingKeyName;
