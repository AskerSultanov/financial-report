var generateColumnNames = (count) => {
  var columnsNames = [];

  for (let i = 0; i < count; i++) {
    var num = i;
    var colName = "";

    while (num >= 0) {
      colName = String.fromCharCode((num % 26) + 65) + colName;
      num = Math.floor(num / 26) - 1;
    }
    columnsNames.push(colName);
  }

  return { columnsNames };
};

export default generateColumnNames;
