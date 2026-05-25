import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${error.message}. If this is MongoDB Atlas, make sure the Render server IP is allowed in Network Access or temporarily allow 0.0.0.0/0 for testing.`,
    );
    process.exit(1);
  }
};

export default connectDB;
