import { ClientEncryption } from "mongodb";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";
import getEncryptionFieldsSchemaMap from "./encryptedFieldsSchemaMap.js";

var timerId = null;
var eventsConfigured = false;
var dbReconnectionAttempts = 1;
var NEXT_CONNECTION_MS = 30_000;
var dbConnectionRestored = false;

var options;
var dataKeyId;
var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

var setupDbEvents = async (dbInstance, dbClientToEncryption) => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;

  dbInstance.connection.on("error", (e) => {
    dbInstance.disconnect();
  });

  dbInstance.connection.on("disconnected", async (e) => {
    console.log("mongoose disconnected");
    if (!timerId) {
      serverEmitter.emit("close");

      timerId = setInterval(async () => {
        console.log({ dbReconnectionAttempts });

        dbReconnectionAttempts++;

        await dbClientToEncryption.connect(process.env.MONGO_URI);
      }, NEXT_CONNECTION_MS);
    }
  });

  dbInstance.connection.on("connected", async () => {
    console.log("connection to db...");

    if (timerId) {
      dbReconnectionAttempts = 0;
      dbConnectionRestored = true;

      clearTimeout(timerId);
      timerId = null;

      await initEncryptedDbConnection();
    }

    if (!dbConnectionRestored) {
      console.log("mongoose connected\n");
    }
  });

  dbClientToEncryption.on("error", async () => {
    if (!timerId) {
      timerId = setInterval(async () => {
        serverEmitter.emit("close");

        dbReconnectionAttempts++;

        await dbInstance.connect(process.env.MONGO_URI, options);
      }, NEXT_CONNECTION_MS);
    }
  });

  databaseEmitter.on("connection_error", () => {
    console.log("databaseEmitterError");
    serverEmitter.emit("close");

    if (!timerId) {
      timerId = setInterval(async () => {
        console.log({ dbReconnectionAttempts });
        dbReconnectionAttempts++;

        await dbClientToEncryption.connect();
      }, NEXT_CONNECTION_MS);
    }
  });

  dbClientToEncryption.on("open", async () => {
    if (timerId) {
      dbReconnectionAttempts = 0;
      dbConnectionRestored = true;

      clearTimeout(timerId);
      timerId = null;

      await initEncryptedDbConnection();
    }
  });

  async function initEncryptedDbConnection() {
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
      var { schemaMap } = getEncryptionFieldsSchemaMap(dataKeyId);

      options = { autoEncryption: { schemaMap, kmsProviders, extraOptions, keyVaultNamespace }, ...JSON.parse(process.env.MONGO_AUTH_OPTIONS) };

      await dbClientToEncryption.close();

      await dbInstance.connect(process.env.MONGO_URI, options);
      serverEmitter.emit("start");
      console.log({ dataKeyId });
    } catch (e) {
      console.log(e.message.toUpperCase(), "\n", e);

      if (e.message.startsWith("connect ECONNREFUSED")) {
        dbInstance.connection.emit("close");
        databaseEmitter.emit("connection_error");
      }
    }
  }
};

export default setupDbEvents;
