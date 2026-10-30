import doRequest from "../../utils/doRequest.js";

var getMainPageData = async (userId) => {
  var res = await doRequest("/my/api/" + userId);

  if (!res.ok) {
    return alert("Не удалось загрузить отчеты");
  }

  var { role, data } = await res.json();

  return { role, data };
};

export default getMainPageData;
