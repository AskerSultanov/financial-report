import doRequest from "../../../../utils/doRequest.js";

var sendSkuPhoto = async (imgData) => {
  var res = await doRequest("/report/image/", {
    method: "POST",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
