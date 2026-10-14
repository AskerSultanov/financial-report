var wrapTableToScrollElem = (table) => {
  var scrollElem = document.createElement("div");
  scrollElem.className = "table-scroll";

  scrollElem.append(table);
  return scrollElem;
};

export default wrapTableToScrollElem;
