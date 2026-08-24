import { taxParamModel } from "../../../models/index.js";

var deleteTaxYears = async (userId) => {
  var result = await taxParamModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );

  return result.modifiedCount;
};

export default deleteTaxYears;
