import changeStatusOfParticipationInPromoService from "../services/changeStatusOfParticipationInPromo.js";

var changeStatusOfParticipationInPromoController = async (req, res, next) => {
  var { success } = await changeStatusOfParticipationInPromoService(req.body);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default changeStatusOfParticipationInPromoController;
