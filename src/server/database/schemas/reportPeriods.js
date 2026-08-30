import { Schema } from "mongoose";

var monthList = ["январь", "февраль", "марта", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

var reportSchema = new Schema(
  {
    year: { type: Number, requred: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    reportId: { type: Number, required: true },
    monthName: { type: String, required: true, enum: monthList },
    monthIndex: { type: Number, required: true, min: 0, max: 11 },
  },
  { _id: false },
);

var reportPeriodsSchema = new Schema({
  userId: { type: String, required: true },
  reportPeriods: { type: [reportSchema], default: [] },
});

reportPeriodsSchema.index({ userId: 1 }, { unique: true });
reportPeriodsSchema.index({ userId: 1, "reportPeriods.dateFrom": 1 }, { unique: true });

export default reportPeriodsSchema;
