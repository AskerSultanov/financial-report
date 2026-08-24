import { reportModel } from "../../models/index.js";

import getReportById from "./services/getReportById.js";
import saveReportToDb from "./services/saveReportToDb.js";
import getSkuFromReport from "./services/getSkuFromReport.js";
import getSkusFromReport from "./services/getSkusFromReport.js";
import saveUpdatedReport from "./services/saveUpdatedReport.js";
import saveUpdatedReports from "./services/saveUpdatedReports.js";
import deleteReportFromDb from "./services/deleteReportFromDb.js";
import getReportsByUserId from "./services/getReportsByUserId.js";
import addReportToAccounted from "./services/addReportToAccounted.js";
import checkReportExistsToDb from "./services/checkReportExistsToDb.js";
import removeReportFromAccounted from "./services/removeReportFromAccounted.js";
import getAllDataFromReportCollection from "./services/getAllDataFromReportCollection.js";

var reportCollectionServices = {
  addReportToAccounted: (userId, reportId) => addReportToAccounted(reportModel, userId, reportId),

  getAllDataFromReportCollection: () => getAllDataFromReportCollection(reportModel),
  getReportById: (userId, reportId, session) => getReportById(reportModel, userId, reportId, session),
  getSkuFromReport: (userId, reportId, skuName, session) => getSkuFromReport(reportModel, userId, reportId, skuName, session),
  getSkusFromReport: (userId, reportId, skuNames, session) => getSkusFromReport(reportModel, userId, reportId, skuNames, session),
  getReportsByUserId: (userId, session, projectQuery, reportIds) => getReportsByUserId(reportModel, userId, session, projectQuery, reportIds),

  saveReportToDb: (userId, report, session) => saveReportToDb(reportModel, userId, report, session),
  saveUpdatedReports: (userId, reports, session) => saveUpdatedReports(reportModel, userId, reports, session),

  checkReportExistsToDb: (userId, dateFrom, dateTo) => checkReportExistsToDb(reportModel, userId, dateFrom, dateTo),

  removeReportFromAccounted: (userId, reportId) => removeReportFromAccounted(reportModel, userId, reportId),
  deleteReportFromDb: (userId, reportId, session) => deleteReportFromDb(reportModel, userId, reportId, session),

  saveUpdatedReport: (userId, reportId, updatedSkus, session) => saveUpdatedReport(reportModel, userId, reportId, updatedSkus, session),
};

export default reportCollectionServices;
