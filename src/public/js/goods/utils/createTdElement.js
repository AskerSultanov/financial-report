var createTdElement = (data, id, ending, title) => {
  var td = document.createElement("td");

  td.append(data || "-");

  if (id) {
    td.id = id + "-" + ending;
  }

  if (title) {
    td.title = title;
  }

  return td;
};

export default createTdElement;
