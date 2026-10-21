import express from "express";
import { join } from "node:path";
import { logger } from "../logger.js";
import cookieParser from "cookie-parser";
import checkRoles from "./middleware/checkRoles.js";
import errorHandler from "./middleware/errorHandler/index.js";
import verifyAuthorization from "./middleware/verifyAuthorization.js";
import verifyAuthentication from "./middleware/verifyAuthentication.js";
import pageNotFoundHandler from "./middleware/pageNotFoundHandler/index.js";
import temporarilyUnavailableHandler from "./middleware/temporarilyUnavailableHandler/index.js";

import { serverEmitter } from "./customEvent/index.js";

import { runDB } from "./database/index.js";

import authRouter from "./routes/auth/index.js";
import rootRouter from "./routes/index/index.js";
import goodsRouter from "./routes/goods/index.js";
import adminRouter from "./routes/admin/index.js";
import tokenRouter from "./routes/WBToken/index.js";
import reportsRouter from "./routes/reports/index.js";
import userDeleteRouter from "./routes/delete/index.js";
import taxParamsRouter from "./routes/taxParams/index.js";
import registrationRouter from "./routes/registration/index.js";
import personalAccountRouter from "./routes/personalAccount/index.js";
import backgroundTasksRouter from "./routes/backgroundTasks/index.js";
import decodeReportWithoutRegistrationRouter from "./routes/decodeReportWithoutRegistration/index.js";

var mainServerIsListen = false;
var errorServerIsListen = false;

var mainServerInstance = null;
var errorServerInstance = null;

var startApp = async () => {
  await runDB();
};

startApp();

serverEmitter.on("start", async () => {
  if (errorServerIsListen) {
    await new Promise((resolve) => {
      errorServerInstance.close(() => {
        errorServerInstance.removeAllListeners();
        errorServerInstance = null;
        errorServerIsListen = false;
        logger.info("---------- ERROR SERVER CLOSED ----------");
        resolve();
      });
    });
  }
  return await runMainServer();
});

serverEmitter.on("close", async () => {
  if (mainServerIsListen) {
    await new Promise((resolve) => {
      mainServerInstance.close(() => {
        mainServerInstance.removeAllListeners();
        mainServerInstance = null;
        mainServerIsListen = false;
        logger.fatal("---------- SERVER CLOSED ----------");
        resolve();
      });
    });
  }
  return await runErrorServer();
});

async function runErrorServer() {
  if (errorServerInstance) {
    await new Promise((resolve) => {
      if (errorServerInstance && errorServerInstance.close) {
        errorServerInstance.close(() => {
          errorServerInstance.removeAllListeners();
          errorServerInstance = null;
          errorServerIsListen = false;
          resolve();
        });
      }
    });
  }

  var errorApp = express();
  errorApp.disable("x-powered-by");
  errorApp.use(express.urlencoded());
  errorApp.use(express.json());
  errorApp.use(express.static(join(import.meta.dirname, "../public")));

  errorApp.use(
    "/decode-report-without-registration/",
    decodeReportWithoutRegistrationRouter,
  );

  errorApp.all(/.*/, temporarilyUnavailableHandler);

  errorApp.use(errorHandler);

  errorServerIsListen = true;
  errorServerInstance = errorApp.listen(process.env.PORT, process.env.HOST);
  logger.warn("---------- ERROR SERVER RUN ----------");
}

async function runMainServer() {
  if (mainServerInstance) {
    await new Promise((resolve) => {
      if (mainServerInstance && mainServerInstance.close) {
        mainServerInstance.close(() => {
          mainServerInstance.removeAllListeners();
          mainServerInstance = null;
          mainServerIsListen = false;
          resolve();
        });
      }
    });
  }

  process.env.NODE_ENV = "production";
  var app = express();

  app.disable("x-powered-by");
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.static(join(import.meta.dirname, "../public")));

  app.use(cookieParser());

  app.use("/auth", authRouter);
  app.use("/reg", registrationRouter);
  app.use("/background-tasks", backgroundTasksRouter);
  app.use(
    "/decode-report-without-registration/",
    decodeReportWithoutRegistrationRouter,
  );

  app.use(verifyAuthentication, verifyAuthorization);
  app.use("/", checkRoles(["admin", "user"]), rootRouter);
  app.use("/wbtoken", checkRoles(["admin", "user"]), tokenRouter);
  app.use("/admin", checkRoles(["admin"]), adminRouter);
  app.use("/tax-params", checkRoles(["admin", "user"]), taxParamsRouter);
  app.use("/report", checkRoles(["admin", "user"]), reportsRouter);
  app.use("/goods", checkRoles(["admin", "user"]), goodsRouter);
  app.use(
    "/personal-account",
    checkRoles(["admin", "user"]),
    personalAccountRouter,
  );
  app.use("/delete", userDeleteRouter);

  app.all(/.*/, pageNotFoundHandler);

  app.use(errorHandler);

  mainServerIsListen = true;
  mainServerInstance = app.listen(process.env.PORT, process.env.HOST);
  logger.info("---------- SERVER RUN ----------");
}
