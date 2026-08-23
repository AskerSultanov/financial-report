var columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

var setColumnHeaderWidths = (ws, mergedSkus) => {
  for (var i = 0; i <= mergedSkus.length; i++) {
    ws.getColumn(columns[i]).width = 35;
  }

  return ws;
};

export default setColumnHeaderWidths;
