import mongoose from "mongoose";
import "./Model/Guide";
import "./Model/Client";
import "./Model/Account";
import "./Model/Review";
import "./Model/Tour";

const MONGODB_URI = process.env.DB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the DB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // try {
  //   await mongoose.connect(MONGODB_URI);
  //   console.log("Successfully connected to Database");
  // } catch (err) {
  //   console.log("Error in connecting to Database: ", err);
  // }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false, // Don't wait; fail fast
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset cache so next request can retry
    throw e;
  }

  return cached.conn;
};

export default connectDB;
