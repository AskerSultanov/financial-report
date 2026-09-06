var firstColumnName = "A";
var columns = ["B", "C", "D", "E", "F", "G", "H"];

var setStylesToSheet = (ws) => {
  ws.getColumn(firstColumnName).width = 25;

  columns.map((column) => (ws.getColumn(column).width = 17));

  return ws;
};

export default setStylesToSheet;
