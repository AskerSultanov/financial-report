import { Schema } from "mongoose";

var basicReportDataSchema = new Schema(
  {
    userId: { type: String, required: true },
    reportId: { type: Number, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    buybackReportIsExist: { type: Boolean, default: false },
    isFinancesAccounted: { type: Boolean, default: false },
    financesAccountedAt: { type: Date, required: false },
    year: { type: Number, requred: true },
    isCrossYearPeriod: { type: Boolean, default: false },
    monthIndex: { type: Number, required: true, min: 0, max: 11 },
    skus: [{ type: Schema.Types.ObjectId, ref: "Sku", required: false }],
  },
  { autoIndex: false },
);

basicReportDataSchema.index({ userId: 1 });
basicReportDataSchema.index({ userId: 1, reportId: 1 }, { unique: true });
basicReportDataSchema.index(
  { userId: 1, dateFrom: 1, dateTo: 1 },
  { unique: true },
);

export default basicReportDataSchema;
