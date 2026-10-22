import doRequest from "./doRequest.js";

var navigateTo = async (url, openNewWindow = false) => {
  var res = await doRequest("/", { method: "GET" });

  if (res.ok) {
    openNewWindow ? window.open(url, "_blank") : (window.location.href = url);
  }
};

export default navigateTo;
