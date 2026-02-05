import express from "express";
import { createUser, getUser, updateUser } from "../controller/user.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getUser);
router.post("/", jwtCheck, createUser);
router.patch("/", jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
