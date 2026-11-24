import doRequest from "../utils/doRequest.js";

var sendNewTaxSetting = async (
  userId,
  year,
  reportsNeedRecalculation = false,
  newTaxSettings,
) => {
  var url = "/tax-settings/";

  var res = await doRequest(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userId,
      year,
      reportsNeedRecalculation,
      data: { ...newTaxSettings },
    }),
  });

  return res.ok;
};

export default sendNewTaxSetting;
