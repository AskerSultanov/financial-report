import { Schema } from "mongoose";

var reportsWithAccountedFinancesSchema = new Schema({
  userId: { type: String, required: true },
  dateFrom: { type: String, required: true, unique: true },
  dateTo: { type: String, required: true },
  reportId: { type: Number, required: true },
  financesAccountedAt: { type: Date, required: true },
});

reportsWithAccountedFinancesSchema.index({ userId: 1, reportId: 1 }, { unique: true });

export default reportsWithAccountedFinancesSchema;
