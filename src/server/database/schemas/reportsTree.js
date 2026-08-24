import { Schema } from "mongoose";

var reportSchema = new Schema(
  {
    reportId: { type: Number, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
  },
  { _id: false },
);

var monthPeriodSchema = new Schema(
  {
    month: { type: String, required: false },
    reportIds: [{ type: reportSchema, required: false }],
  },
  { _id: false },
);

var yearsPeriodSchema = new Schema(
  {
    year: { type: Number, required: false },
    months: [{ type: monthPeriodSchema }],
  },
  { _id: false },
);

var reportsTreeSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  years: [{ type: yearsPeriodSchema, required: false }],
});

export default reportsTreeSchema;
