import express from "express";
import { join } from "node:path";
import cookieParser from "cookie-parser";
import checkRoles from "./middleware/checkRoles.js";
import errorHandler from "./middleware/errorHandler/index.js";
import pageNotFoundHandler from "./middleware/pageNotFoundHandler/index.js";
import verifyAuthorization from "./middleware/verifyAuthorization.js";
import verifyAuthentication from "./middleware/verifyAuthentication.js";

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

var createServer = () => {
  var app = express();
  return app;
};

var runErrorServer = async () => {
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

  var errorApp = createServer();
  errorApp.get("/", (_, res) =>
    res
      .set({ "Content-Type": "text/html" })
      .send("<p>Сервер временно недоступен</p>"),
  );
  errorServerIsListen = true;
  errorServerInstance = errorApp.listen(
    process.env.PORT,
    process.env.HOST,
    () => console.log("Сервер временно недоступен."),
  );
};

var runServer = async () => {
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
  var app = createServer();

  app.disable("x-powered-by");
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.static(join(import.meta.dirname, "../public")));

  app.use("/auth", authRouter);
  app.use("/reg", registrationRouter);
  app.use("/background-tasks", backgroundTasksRouter);
  app.use(
    "/decode-report-without-registration/",
    decodeReportWithoutRegistrationRouter,
  );

  app.use(cookieParser());
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
  mainServerInstance = app.listen(
    process.env.PORT,
    process.env.HOST,
    async () => console.log("server running"),
  );
};

var startApp = async () => {
  try {
    await runDB();
    await runServer();
  } catch (e) {
    console.log(e);
    if (
      e.name !== "MongooseServerSelectionError" ||
      e.name !== "MongoServerSelectionError"
    ) {
      await runErrorServer();
    }
  }
};

startApp();

serverEmitter.on("start", async () => {
  if (errorServerIsListen) {
    await new Promise((resolve) => {
      errorServerInstance.close(() => {
        errorServerInstance.removeAllListeners();
        errorServerInstance = null;
        errorServerIsListen = false;
        resolve();
      });
    });
  }
  return await runServer();
});

serverEmitter.on("close", async () => {
  if (mainServerIsListen) {
    await new Promise((resolve) => {
      mainServerInstance.close(() => {
        mainServerInstance.removeAllListeners();
        mainServerInstance = null;
        mainServerIsListen = false;
        resolve();
      });
    });
  }
  return await runErrorServer();
});

process.on("unhandledRejection", async (reason, promise) => {
  //console.log("reason name: ", reason.name);
});
