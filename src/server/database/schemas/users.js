import { Schema } from "mongoose";

var userSchema = new Schema(
  {
    passwd: { type: String, required: true },
    registeredAt: { type: Date, required: true },
    login: { type: String, required: true },
    userId: { type: String, required: true },
    lastLogin: { type: Date, required: false },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { autoIndex: false },
);

userSchema.index({ login: 1 }, { unique: true });
userSchema.index({ userId: 1 }, { unique: true });

export default userSchema;
