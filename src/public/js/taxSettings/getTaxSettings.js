import doRequest from "../utils/doRequest.js";

var getTaxSettings = async (userId) => {
  var res = await doRequest("/tax-settings/api/" + userId);

  var { taxSettings } = await res.json();

  return { taxSettings };
};

export default getTaxSettings;
