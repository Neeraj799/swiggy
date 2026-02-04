import express from "express";
import { createUser } from "../controller/user.controller.ts";
import { jwtCheck } from "../middleware/auth.ts";

const router = express.Router();

router.post("/", jwtCheck, createUser);

export default router;
