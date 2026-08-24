var deleteTaxYears = async (taxParamModel, userId) => {
  var result = await taxParamModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );

  return result.modifiedCount;
};

export default deleteTaxYears;
