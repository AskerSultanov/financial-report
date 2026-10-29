var wrapTableToScrollElem = (table) => {
  var scrollElem = document.createElement("div");
  scrollElem.className = "table-scroll";

  scrollElem.id = "scroll-" + table.id;
  scrollElem.append(table);
  return scrollElem;
};

export default wrapTableToScrollElem;
