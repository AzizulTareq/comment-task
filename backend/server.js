import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

// error handaling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}!!`);
});
