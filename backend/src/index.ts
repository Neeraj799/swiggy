import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import searchRoutes from "./routes/search.routes";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);

app.use("/api/restaurant", restaurantRoutes);

app.listen(4800, () => {
  console.log("Server started on localhost:4800");
});
