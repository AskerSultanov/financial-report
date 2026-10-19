var hasDot = (num) => num.toString().split("").includes(".");

var truncateNum = (n) => {
  if (typeof n === "number" && !isNaN(n)) {
    if (!hasDot(n)) {
      return n;
    }

    return +n.toFixed(2);
  }

  return n;
};

export default truncateNum;
