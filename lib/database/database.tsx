import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the DB_URI environment variable");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to Database");
  } catch (err) {
    console.log("Error in connecting to Database: ", err);
  }
};

export default connectDB;
