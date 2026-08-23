import { Schema } from "mongoose";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  lastUsed: { type: Date, required: false },
  token: { type: String, required: false, default: "" },
  tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
});

export default tokenSchema;
