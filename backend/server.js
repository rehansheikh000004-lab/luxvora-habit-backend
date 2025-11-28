// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitsRoutes from "./routes/habits.js";

dotenv.config();
const app = express();

app.use(express.json());

// CORS - allow frontend origin (use env)
const FRONTEND = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: FRONTEND, credentials: true }));

// Connect DB
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}
await connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitsRoutes);

app.get("/", (req, res) => res.json({ ok: true, message: "LuxVora Habit API" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
