import Joi from "joi";

var schema = Joi.object({ login: Joi.string().required(), passwd: Joi.any().required() });

var checkAuthAdminDataController = async (req, res, next) => {
  var { login, passwd } = req.body;
};

export default checkAuthAdminDataController;
