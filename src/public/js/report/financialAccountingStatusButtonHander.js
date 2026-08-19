var url = "/report/financial-accounting-status/";
var button = document.getElementById("financial-accounting-status-button");

var yes = "Да";
var no = "Нет";

var financialAccountingStatusButtonHander = (userId, reportId) => {
  button.onclick = async () => {
    var financialAccountingStatusSpanElem = document.getElementById("financial-accounting-status");
    var currentStatus = false;

    if (financialAccountingStatusSpanElem.hasAttribute("is-finances-accounted")) {
      currentStatus = true;
    }

    var newStatusIsTrue = currentStatus !== true;
    var newTextContent = currentStatus ? no : yes;
    var message = `Изменить статус учета финансов отчета на <${newTextContent}>`;

    var confirmed = confirm(message);

    if (confirmed) {
      var success = await sendNewFinancialAccountingStatus(userId, reportId, newStatusIsTrue);

      if (!success) {
        alert("Не удалось изменить статус...");
        return;
      }

      financialAccountingStatusSpanElem.textContent = newTextContent;

      if (newStatusIsTrue) {
        financialAccountingStatusSpanElem.setAttribute("is-finances-accounted", "");
      } else {
        financialAccountingStatusSpanElem.removeAttribute("is-finances-accounted");
      }
    }
  };
};

export default financialAccountingStatusButtonHander;

async function sendNewFinancialAccountingStatus(userId, reportId, newStatus) {
  var res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ userId, reportId, newStatus }),
    headers: { "Content-type": "application/json" },
  });
  return res.status === 200;
}
