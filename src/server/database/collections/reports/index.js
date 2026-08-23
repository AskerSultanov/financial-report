import { reportCollection } from "../../connections/index.js";

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
  addReportToAccounted: (userId, reportId) => addReportToAccounted(reportCollection, userId, reportId),

  getAllDataFromReportCollection: () => getAllDataFromReportCollection(reportCollection),
  getReportById: (userId, reportId, session) => getReportById(reportCollection, userId, reportId, session),
  getSkuFromReport: (userId, reportId, skuName, session) => getSkuFromReport(reportCollection, userId, reportId, skuName, session),
  getSkusFromReport: (userId, reportId, skuNames, session) => getSkusFromReport(reportCollection, userId, reportId, skuNames, session),
  getReportsByUserId: (userId, session, projectQuery, reportIds) => getReportsByUserId(reportCollection, userId, session, projectQuery, reportIds),

  saveReportToDb: (userId, report, session) => saveReportToDb(reportCollection, userId, report, session),
  saveUpdatedReports: (userId, reports, session) => saveUpdatedReports(reportCollection, userId, reports, session),

  checkReportExistsToDb: (userId, dateFrom, dateTo) => checkReportExistsToDb(reportCollection, userId, dateFrom, dateTo),

  removeReportFromAccounted: (userId, reportId) => removeReportFromAccounted(reportCollection, userId, reportId),
  deleteReportFromDb: (userId, reportId, session) => deleteReportFromDb(reportCollection, userId, reportId, session),

  saveUpdatedReport: (userId, reportId, updatedSkus, session) => saveUpdatedReport(reportCollection, userId, reportId, updatedSkus, session),
};

export default reportCollectionServices;
