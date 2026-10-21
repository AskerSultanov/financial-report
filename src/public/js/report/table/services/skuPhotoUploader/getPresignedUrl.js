import doRequest from "../../../../utils/doRequest.js";

var getPresignedUrl = async (userId, skuName, fileType) => {
  var res = await doRequest("/report/image/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, skuName, fileType }),
  });

  if (!res.ok) {
    return {
      presignedUrl: "",
      errorText: "ЧНе удалось сохранить изображение.\nПопробуйте еще раз.",
    };
  }

  var { presignedUrl } = await res.json();

  return { presignedUrl, errorText: "" };
};

export default getPresignedUrl;
