// models/Habit.js
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, required: true, trim: true },
  notes:     { type: String },
  frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
  goal:      { type: Number, default: 1 }, // times per period
  color:     { type: String, default: "#00d1ff" },
  active:    { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Habit || mongoose.model("Habit", habitSchema);
