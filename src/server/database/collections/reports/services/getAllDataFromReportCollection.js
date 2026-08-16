var getAllDataFromReportCollection = async (collection) => {
  var data = await collection.find();

  return data.map((item) => item.toObject());
};

export default getAllDataFromReportCollection;
