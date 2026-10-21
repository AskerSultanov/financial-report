import doRequest from "../utils/doRequest.js";

var getTokenData = async (userId) => {
  var url = "/wbtoken/" + userId;

  var res = await doRequest(url);

  var { tokensDetails } = await res.json();

  return { tokensDetails };
};

export default getTokenData;
