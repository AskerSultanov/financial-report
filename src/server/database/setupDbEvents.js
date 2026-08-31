import getMongooseOptions from "./getMongooseOptions.js";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var MAX_DELAY_MS = 60_000;
var reconnectAttempts = 0;
var INITIAL_DELAY_MS = 1000;
var currentDelay = INITIAL_DELAY_MS;

var reconnectTimer = null;
var isReconnecting = false;
var eventsConfigured = false;

var clearReconnectTimer = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

var resetReconnectState = () => {
  isReconnecting = false;
  reconnectAttempts = 0;
  currentDelay = INITIAL_DELAY_MS;
  clearReconnectTimer();
};

var scheduleReconnect = (dbInstance, dbClientToEncryption) => {
  if (isReconnecting) return;

  isReconnecting = true;
  serverEmitter.emit("close");

  var tryConnect = async () => {
    if (!isReconnecting) return;

    reconnectAttempts += 1;
    console.log({
      attempt: reconnectAttempts,
      delayBeforeThisAttempt: currentDelay,
    });

    try {
      var options = await getMongooseOptions(dbClientToEncryption);

      await dbInstance.connect(process.env.MONGO_URI, options);
    } catch (err) {
      console.error("Reconnect attempt failed:", err?.message || err);

      currentDelay = Math.min(currentDelay * 2, MAX_DELAY_MS);
      console.log({ nextDelayMs: currentDelay });

      reconnectTimer = setTimeout(tryConnect, currentDelay);
    }
  };

  reconnectTimer = setTimeout(tryConnect, 300);
};

var setupDbEvents = (dbInstance, dbClientToEncryption) => {
  if (eventsConfigured) return;
  eventsConfigured = true;

  dbInstance.connection.on("error", (err) => {
    console.error("mongoose connection error:", err?.message || err);
  });

  dbInstance.connection.on("disconnected", () => {
    console.log("mongoose disconnected");
    scheduleReconnect(dbInstance, dbClientToEncryption);
  });

  dbInstance.connection.on("connected", () => {
    if (isReconnecting) {
      console.log("mongoose reconnected");
      serverEmitter.emit("start");
    } else {
      console.log("mongoose connected");
    }
    resetReconnectState();
  });

  dbClientToEncryption.on("error", (err) => {
    console.error("encryption client error:", err?.message || err);
  });

  databaseEmitter.on("connection_error", () => {
    console.log("databaseEmitter: connection_error");
    scheduleReconnect(dbInstance, dbClientToEncryption);
  });
};

export default setupDbEvents;
