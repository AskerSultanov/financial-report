/**
 * @param {'cost-price' | 'other-expenses'} targetUrlEnding
 */

var sendChangedData = async (data, targetUrlEnding) => {
  var targetRouterPath = window.location.pathname.split("/")[1];
  var url = "/" + targetRouterPath + "/skus/" + targetUrlEnding;

  var res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    alert("Не удалось изменить данные");
    return;
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
