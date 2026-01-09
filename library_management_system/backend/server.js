import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database.js";
import { ErrorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "📚 Library Management System API is running",
  });
});

// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/issue", issueRoutes);

connectDB()

app.use(ErrorMiddleware)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
