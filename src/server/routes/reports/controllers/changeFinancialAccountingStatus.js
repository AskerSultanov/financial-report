import changeFinancialAccountingStatusService from "../services/changeFinancialAccountingStatus.js";

var changeFinancialAccountingStatusController = async (req, res) => {
  await changeFinancialAccountingStatusService(req.body);

  return res.sendStatus(200);
};

export default changeFinancialAccountingStatusController;
