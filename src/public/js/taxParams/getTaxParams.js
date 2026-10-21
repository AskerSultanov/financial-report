import doRequest from "../utils/doRequest.js";

var getTaxParams = async (userId) => {
  var res = await doRequest("/tax-params/api/" + userId);

  var { taxParams } = await res.json();

  return { taxParams };
};

export default getTaxParams;
