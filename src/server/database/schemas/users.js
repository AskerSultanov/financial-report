import { Schema } from "mongoose";

var usersSchema = new Schema({
  passwd: { type: String, required: true },
  registeredAt: { type: Date, required: true },
  login: { type: String, required: true },
  userId: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
});

usersSchema.index({ login: 1 }, { unique: true });
usersSchema.index({ userId: 1 }, { unique: true });

export default usersSchema;
