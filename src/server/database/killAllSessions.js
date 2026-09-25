var killAllSessions = async (dbClient) => {
  await dbClient.db.command({ killAllSessions: [] });
};

export default killAllSessions;
