import express from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controller/search.controller";

const router = express.Router();

router.get(
  "/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City paramenter must be a valid string"),
  searchRestaurant,
);

export default router;
