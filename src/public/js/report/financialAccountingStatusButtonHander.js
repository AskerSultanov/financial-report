import doRequest from "../utils/doRequest.js";

var url = "/report/financial-accounting-status/";
var button = document.getElementById("financial-accounting-status-button");

var yes = "Да";
var no = "Нет";

var financialAccountingStatusButtonHander = (userId, reportId) => {
  button.onclick = async () => {
    var financialAccountingStatusElem = document.getElementById(
      "financial-accounting-status",
    );

    var currentStatus = false;

    var isFinancesAccounted = financialAccountingStatusElem.hasAttribute(
      "is-finances-accounted",
    );

    if (isFinancesAccounted) {
      currentStatus = true;
    }

    var newStatus = !currentStatus;
    var newTextContent = currentStatus ? no : yes;
    var message = `Изменить статус учета финансов отчета на <${newTextContent}>`;
    var confirmed = confirm(message);

    if (confirmed) {
      var res = await doRequest(url, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId, reportId, newStatus }),
      });

      if (!res.ok) {
        alert("Не удалось изменить статус...");
        return;
      }

      financialAccountingStatusElem.textContent = newTextContent;

      if (newStatus) {
        financialAccountingStatusElem.setAttribute("is-finances-accounted", "");
      } else {
        financialAccountingStatusElem.removeAttribute("is-finances-accounted");
      }
    }
  };
};

export default financialAccountingStatusButtonHander;
