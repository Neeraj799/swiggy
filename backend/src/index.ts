import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.ts";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(4800, () => {
  console.log("Server started on localhost:4800");
});
