import doRequest from "./doRequest.js";

var navigateTo = async (url) => {
  var res = await doRequest("/", { method: "GET" });

  if (res.ok) {
    window.location.href = url;
  }
};

export default navigateTo;
