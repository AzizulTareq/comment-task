import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./database/db.js";

const PORT = process.env.PORT;

const app = express();
connectDB();

app.listen(
  (PORT,
  () => {
    console.log(`App is running on port ${PORT}`);
  })
);
