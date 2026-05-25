import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/v1/books", bookRoutes);

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    status: 404,
  });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;
