export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({
      success: false,
      message: `Validation Error: ${messages}`,
      status: 400,
    });
  }

  // Mongoose cast error (invalid ID)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      status: 400,
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      status: 400,
    });
  }

  res.status(status).json({
    success: false,
    message,
    status,
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
