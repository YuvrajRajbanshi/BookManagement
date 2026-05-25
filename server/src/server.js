import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`========================================\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
