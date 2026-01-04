import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  // Skip MongoDB connection if URI is not configured
  if (!ENV.MONGO_URI || ENV.MONGO_URI.includes("your_mongo_uri_here")) {
    console.log("⚠️  MongoDB URI not configured. Some features may not work.");
    console.log("   To enable full functionality, add MONGO_URI to backend/.env");
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    console.log("⚠️  Server will continue without database. Some features may not work.");
    // Don't exit - allow server to run without DB for basic testing
  }
};
