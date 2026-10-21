import doRequest from "../../utils/doRequest.js";

var url = "/report/loading-state/abandoned/";

var sendAbandonedReports = async (userId, needToResumeLoading) => {
  try {
    var res = await doRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, needToResumeLoading }),
    });

    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export default sendAbandonedReports;
