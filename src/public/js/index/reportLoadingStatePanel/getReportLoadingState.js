import doRequest from "../../utils/doRequest.js";

var getReportLoadingState = async (userId) => {
  var url = "/report/loading-state/" + userId + "/";

  var res = await doRequest(url);
  var reportLoadingState = await res.json();
  return reportLoadingState;
};

export default getReportLoadingState;
