import mongoose from "mongoose";
import setupDbEvents from "./setupDbEvents.js";
import { MongoClient, ClientEncryption } from "mongodb";
import { databaseEmitter } from "../customEvent/index.js";
import getEncryptionFieldsSchemaMap from "./encryptedFieldsSchemaMap.js";

var dataKeyId;
var dbClient = mongoose.connection;
var dbClientToEncryption = new MongoClient(process.env.MONGO_URI, { ...JSON.parse(process.env.MONGO_AUTH_OPTIONS) });

var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

var killAllSessions = async () => await dbClient.db.command({ killAllSessions: [] }).then(() => console.log("old sessions killed"));

var runDB = async () => {
  await setupDbEvents(mongoose, dbClientToEncryption);

  try {
    await dbClientToEncryption.connect();

    var keyVault = dbClientToEncryption.db(process.env.KEY_VAULT_DATABASE_NAME).collection(process.env.KEY_VAULT_COLLECTION_NAME);
    var existingKey = await keyVault.findOne({
      keyAltNames: process.env.MONGO_KEY_ALT_NAME,
    });

    if (!existingKey) {
      var encryption = new ClientEncryption(dbClientToEncryption, { kmsProviders, keyVaultNamespace });
      dataKeyId = await encryption.createDataKey("local", { keyAltNames: [process.env.MONGO_KEY_ALT_NAME] });
    } else {
      dataKeyId = existingKey._id;
    }

    await dbClientToEncryption.close();

    var { schemaMap } = getEncryptionFieldsSchemaMap(dataKeyId);
    var options = { autoEncryption: { schemaMap, kmsProviders, extraOptions, keyVaultNamespace }, ...JSON.parse(process.env.MONGO_AUTH_OPTIONS) };

    await mongoose.connect(process.env.MONGO_URI, options);

    await killAllSessions();
  } catch (e) {
    console.log(e.message.toUpperCase());

    if (e.message.startsWith("connect ECONNREFUSED")) {
      mongoose.connection.emit("close");
      databaseEmitter.emit("connection_error");
    }
  }

  //await runDBMigration().then(() => console.log("\n     migration completed\n-------------------------\n"));
};

export { runDB, dbClient };
