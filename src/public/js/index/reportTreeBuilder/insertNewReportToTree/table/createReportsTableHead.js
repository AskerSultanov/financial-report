import createThElement from "../../../../report/table/services/createThElement.js";

var createReportsTableHead = () => {
  var reportPeriod = createThElement("Период отчета");

  var financesAccounted = createThElement("Финансы учтены");

  var reportLink = createThElement("");

  var tr = document.createElement("tr");

  tr.append(reportPeriod, financesAccounted, reportLink);

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createReportsTableHead;
