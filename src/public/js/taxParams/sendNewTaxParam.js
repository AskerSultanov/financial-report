import doRequest from "../utils/doRequest.js";

var sendNewTaxParam = async (
  userId,
  year,
  reportsNeedRecalculation = false,
  newTaxParam,
) => {
  var url = "/tax-params/";

  var res = await doRequest(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userId,
      year,
      reportsNeedRecalculation,
      data: { ...newTaxParam },
    }),
  });

  return res.ok;
};

export default sendNewTaxParam;
