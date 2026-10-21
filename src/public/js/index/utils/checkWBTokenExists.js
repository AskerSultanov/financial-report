import doRequest from "../../utils/doRequest.js";

var url = "/wbtoken/check-exist/";

var checkWBTokenExists = async (userId) => {
  try {
    var res = await doRequest(url, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "Content-Type": "application/json" },
    });

    var { errorText } = await res.json();

    if (errorText) {
      alert(errorText);
      return;
    }
    return true;
  } catch {
    return;
  }
};

export default checkWBTokenExists;
