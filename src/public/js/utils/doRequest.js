var doRequest = async (url, options = {}) => {
  var res = await fetch(url, options);

  if (res.status === 401) {
    window.location.href = "/decode-report-without-registration/";
  }
  return res;
};

export default doRequest;
