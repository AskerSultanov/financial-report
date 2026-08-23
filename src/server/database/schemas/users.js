import { Schema } from "mongoose";

var usersSchema = new Schema({
  passwd: { type: String, required: true },
  registeredAt: { type: Date, required: true },
  login: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "user", enum: ["user", "admin"] },
});

export default usersSchema;
