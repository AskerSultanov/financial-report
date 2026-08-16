var getTaxParamsFromDb = async (collection, userId, year, session) => {
  var sessionOpt = session ? { session: session } : {};
  var data = await collection.findOne({ userId }, null, { ...sessionOpt });

  if (year) {
    return data.toObject().years.find((date) => date.year == year);
  }

  return data.toObject().years;
};

export default getTaxParamsFromDb;
