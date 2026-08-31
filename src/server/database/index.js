import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import setupDbEvents from "./setupDbEvents.js";
import getMongooseOptions from "./getMongooseOptions.js";
import { databaseEmitter, serverEmitter } from "../customEvent/index.js";

var dbClient = mongoose.connection;
var authOptions = JSON.parse(process.env.MONGO_AUTH_OPTIONS);
var dbClientToEncryption = new MongoClient(process.env.MONGO_URI, { ...authOptions });

var killAllSessions = async () => await dbClient.db.command({ killAllSessions: [] });

var runDB = async () => {
  setupDbEvents(mongoose, dbClientToEncryption);

  try {
    var options = await getMongooseOptions(dbClientToEncryption);

    await mongoose.connect(process.env.MONGO_URI, options);
    await killAllSessions();

    serverEmitter.emit("start");
  } catch (e) {
    console.error(e.message?.toUpperCase() || e);

    databaseEmitter.emit("connection_error");
  }
};

export { runDB, dbClient };
