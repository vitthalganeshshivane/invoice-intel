import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Database Connection Successful");
  } catch (error) {
    console.error(`Error connecting to MongoDB`, error);
    process.exit(1);
  }
};

export default connectDB;
