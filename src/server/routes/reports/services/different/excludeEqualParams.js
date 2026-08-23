var excludeEqualParams = (prevData, currentData) => {
  var nonEqualParams = {};

  var prevDataKeys = Object.keys(prevData);
  var currentDataKeys = Object.keys(currentData);

  for (var currentDataKey of currentDataKeys) {
    var prevDataKey = prevDataKeys.find((key) => key === currentDataKey);

    if (prevDataKey) {
      if (prevData[prevDataKey] !== currentData[currentDataKey] && !currentDataKey.startsWith("costPrice")) {
        nonEqualParams[currentDataKey] = currentData[currentDataKey];
      }
    }
  }

  return nonEqualParams;
};

export default excludeEqualParams;
