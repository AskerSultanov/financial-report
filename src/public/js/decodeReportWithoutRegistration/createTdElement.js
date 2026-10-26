var createTdElement = (data, id, className) => {
  var td = document.createElement("td");

  if (id) {
    td.id = id;
  }

  if (className) {
    td.className = className;
  }

  td.append(data ?? "");

  return td;
};

export default createTdElement;
