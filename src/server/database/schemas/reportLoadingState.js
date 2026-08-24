import { Schema } from "mongoose";

var lastLoadedReportSchema = new Schema(
  {
    periodIndex: { type: Number },
    year: { type: Number, required: true },
    month: { type: String, required: true },
    dateTo: { type: String, required: true },
    dateFrom: { type: String, required: true },
    reportId: { type: Number, required: true },
    totalTaxAmount: { type: Number, default: 0, required: true },
  },
  { _id: false },
);

var queueItemSchema = new Schema(
  {
    index: { type: Number, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    failedCount: { type: Number, required: true, default: 0, min: 0, max: 3 },
  },
  { _id: false },
);

var emptyReportPeriodItemSchema = new Schema(
  {
    index: { type: Number, required: false },
    dateTo: { type: String, required: true },
    dateFrom: { type: String, required: true },
  },
  { _id: false },
);

var reportLoadingStatesSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  queueLength: { type: Number, default: 0 },
  queueCapacity: { type: Number, default: 0 },
  reportsQueue: { type: [queueItemSchema], required: false },
  abandonedReports: { type: [queueItemSchema], required: false },
  loadingInProgress: { type: Boolean, default: false },
  lastReportRequestTimestamp: { type: Number, default: 0 },
  freshReportPeriodIndex: { type: Number, required: false },
  lastLoadedReport: { type: lastLoadedReportSchema, required: false },
  isReportLoadingDelayed: { type: Boolean, requred: true, default: false },
  isReportLoadingIsStopped: { type: Boolean, requred: true, default: false },
  loadingStopReason: { type: String, default: "", required: false },
  emptyReportPeriods: { type: [emptyReportPeriodItemSchema], required: false },
});

export default reportLoadingStatesSchema;
