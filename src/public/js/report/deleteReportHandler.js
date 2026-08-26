var button = document.getElementById("delete-report-button");

var sendDeletionRequest = async (userId, reportId) => {
  var res = await fetch("/report", {
    method: "DELETE",
    body: JSON.stringify({ userId, reportId }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var deleteReportHandler = (userId, reportId) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить отчет?");

    if (confirmed) {
      var success = await sendDeletionRequest(userId, reportId);

      if (success) {
        alert("Отчет успешно удален");
        var splitedPathName = window.location.pathname.split("/");

        var urlToMainPage = splitedPathName.includes("user") ? "/admin/user/" + userId : "/";

        window.location.href = urlToMainPage;
      } else {
        alert("Не удалось удалить отчет...");
      }
    }
  });

export default deleteReportHandler;
