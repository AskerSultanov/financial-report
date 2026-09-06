import reportLoadDelegateService from "../services/reportLoadDelegate.js";

var reportLoadDelegateController = async (req, res, next) => {
  var { callNext, errorText, infoText, reportData } =
    await reportLoadDelegateService(req.body);

  if (!callNext) {
    return res.json({ errorText, infoText, reportData });
  }

  next();
};

export default reportLoadDelegateController;
