var getAllDataFromReportCollection = async (reportModel) => {
  var data = await reportModel.find();

  return data.map((item) => item.toObject());
};

export default getAllDataFromReportCollection;
