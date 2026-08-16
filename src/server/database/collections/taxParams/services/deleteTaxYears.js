var deleteTaxYears = async (collection, userId) => {
  var result = await collection.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );

  return result.modifiedCount;
};

export default deleteTaxYears;
