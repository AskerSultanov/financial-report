import { taxParamModel } from "../../models/index.js";
import deleteTaxYears from "./services/deleteTaxYears.js";
import addNewTaxYearToDb from "./services/addNewTaxYear.js";
import getTaxParamsFromDb from "./services/getTaxParamsFromDb.js";
import changeTaxParamsToDb from "./services/changeTaxParamsToDb.js";

var taxParamsCollectionServices = {
  deleteTaxYears: (userId) => deleteTaxYears(taxParamModel, userId),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(taxParamModel, userId, year, session),

  getTaxParamsFromDb: (userId, year, session) => getTaxParamsFromDb(taxParamModel, userId, year, session),

  changeTaxParamsToDb: (userId, session, ...updatedTaxParams) => changeTaxParamsToDb(taxParamModel, userId, session, ...updatedTaxParams),
};

export default taxParamsCollectionServices;
