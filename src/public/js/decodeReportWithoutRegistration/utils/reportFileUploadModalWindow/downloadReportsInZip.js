var fileName = `Отчеты.zip`;

var downloadReportsInZip = (zipBuffer) => {
  var blob = new Blob([zipBuffer]);

  var downloadUrl = window.URL.createObjectURL(blob);

  var a = document.createElement("a");
  a.href = downloadUrl;

  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(downloadUrl);

  a.remove();
};

export default downloadReportsInZip;
