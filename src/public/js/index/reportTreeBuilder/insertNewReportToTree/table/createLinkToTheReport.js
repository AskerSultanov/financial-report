import navigateTo from "../../../../utils/navigateTo.js";

var splitedPathName = window.location.pathname.split("/");

var createLinkToTheReport = (reportId) => {
  var button = document.createElement("button");

  button.textContent = "Открыть отчет";

  var url;

  if (splitedPathName.includes("user")) {
    var userId = splitedPathName.at(-1);

    url = `/admin/user/${userId}/report/${reportId}`;
  } else {
    url = "/report/" + reportId;
  }

  button.onclick = () => navigateTo(url);

  return button;
};

export default createLinkToTheReport;
