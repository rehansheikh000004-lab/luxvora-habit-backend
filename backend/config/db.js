// config/db.js
import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGO_URI is required");
  return mongoose.connect(uri, {
    // options defaulted for mongoose v7+
  }).then(conn => {
    console.log("✅ MongoDB connected:", conn.connection.host);
  }).catch(err => {
    console.error("MongoDB connection error:", err.message);
    throw err;
  });
}
