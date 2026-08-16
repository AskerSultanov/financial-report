var getReportTree = async (collection, userId, session) => {
    var sessionOpt = session ? { session: session } : {};
    var data = await collection.findOne({ userId }, null, { ...sessionOpt });

    return { reportTree: data.years };
};

export default getReportTree;
