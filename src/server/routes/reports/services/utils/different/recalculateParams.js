import truncateNum from "../reportParsing/truncateNum.js";

var recalculateParams = (accumulator, targetObj, prevTargetObj) => {
  var accKeys = Object.keys(accumulator);

  for (var targetObjKey in targetObj) {
    var keyExist = accKeys.find((accKey) => accKey === targetObjKey);

    if (keyExist) {
      if (typeof targetObj[targetObjKey] === "number" && !isNaN(targetObj[targetObjKey])) {
        var prevValue = prevTargetObj[targetObjKey] || 0;
        var newValue = targetObj[targetObjKey];

        var recalculatedValue = accumulator[targetObjKey] - prevValue + newValue;

        accumulator[targetObjKey] = truncateNum(recalculatedValue);
      } else if (typeof targetObj[targetObjKey] === "boolean") {
        accumulator[targetObjKey] = targetObj[targetObjKey];
      }
    } else {
      accumulator[targetObjKey] = targetObj[targetObjKey];
    }
  }

  return accumulator;
};

export default recalculateParams;
