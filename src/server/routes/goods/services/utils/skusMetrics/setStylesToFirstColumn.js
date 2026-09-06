var firstColumnName = "A";

var setStylesToFirstColumn = function (ws) {
  ws.getColumn(firstColumnName).width = 40;
  return ws;
};

export default setStylesToFirstColumn;
