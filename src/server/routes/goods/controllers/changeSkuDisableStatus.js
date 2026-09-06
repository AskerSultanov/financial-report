import changeSkuDisableStatusService from "../services/changeSkuDisableStatus.js";

var changeSkuDisableStatusController = async (req, res, next) => {
  var { success } = await changeSkuDisableStatusService(req.body);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default changeSkuDisableStatusController;
