// routes/habits.js
import express from "express";
import auth from "../middleware/auth.js";
import Habit from "../models/Habit.js";
import Checkin from "../models/Checkin.js";

const router = express.Router();

// GET /api/habits  - list user's habits
router.get("/", auth, async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(habits);
});

// POST /api/habits  - create habit
router.post("/", auth, async (req, res) => {
  const { title, notes, frequency, goal, color } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const habit = await Habit.create({ userId: req.user.id, title, notes, frequency, goal, color });
  res.status(201).json(habit);
});

// PUT /api/habits/:id - update habit
router.put("/:id", auth, async (req, res) => {
  const updated = await Habit.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE /api/habits/:id
router.delete("/:id", auth, async (req, res) => {
  const deleted = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

/* ---------- Checkins ---------- */

// POST /api/habits/:id/checkin
router.post("/:id/checkin", auth, async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  const { note } = req.body;
  const checkin = await Checkin.create({ habitId: habit._id, userId: req.user.id, note });
  res.status(201).json(checkin);
});

// GET /api/habits/:id/checkins
router.get("/:id/checkins", auth, async (req, res) => {
  const checkins = await Checkin.find({ habitId: req.params.id, userId: req.user.id }).sort({ date: -1 });
  res.json(checkins);
});

export default router;
