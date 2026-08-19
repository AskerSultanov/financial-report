var downloadWeeklyPricesFileButton = document.getElementById("download-weekly-prices-file");

var downloadWeeklyPricesFileButtonHandler = (userId) => {
  downloadWeeklyPricesFileButton.addEventListener("click", async (e) => {
    alert("Пока недоступно");
    return;

    var url = "/goods/prices-discounts/file/" + userId;

    var res = await fetch(url);
    var blob = await res.blob();
    var downloadUrl = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = downloadUrl;
    var fileName = `Цены на неделю .xlsx`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  });
};

export default downloadWeeklyPricesFileButtonHandler;
