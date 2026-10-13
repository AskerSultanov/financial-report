var getReportData = async (url) => {
  var res = await fetch(url);

  if (res.status === 404) {
    alert("Отчет не найден");
    window.location.href = "/";
  } else if (!res.ok) {
    alert("Ошибка при получении отчета");
    window.location.href = "/";
  }

  var { report, signedUrls, skusWithLastCostPrices } = await res.json();

  return { report, signedUrls, skusWithLastCostPrices };
};

export default getReportData;
