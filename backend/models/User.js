// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
