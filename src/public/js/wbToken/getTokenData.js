var url = "/wbtoken/";

var getTokenData = async (userId) => {
  var res = await fetch(url + userId);

  var { tokenDetails, tokenIsExist } = await res.json();

  return { tokenDetails, tokenIsExist };
};

export default getTokenData;
