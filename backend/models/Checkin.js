// models/Checkin.js
import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema({
  habitId:  { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date:     { type: Date, default: () => new Date() },
  note:     { type: String }
}, { timestamps: true });

export default mongoose.models.Checkin || mongoose.model("Checkin", checkinSchema);
