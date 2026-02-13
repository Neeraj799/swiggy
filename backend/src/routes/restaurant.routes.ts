import express from "express";
import multer from "multer";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantDetails,
  getRestaurantOrders,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get("/order", jwtCheck, jwtParse, getRestaurantOrders);

router.patch("/order/:orderId/status", jwtCheck, jwtParse, updateOrderStatus);

router.get("/", jwtCheck, jwtParse, getRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  createRestaurant,
);

router.patch(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateRestaurant,
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  getRestaurantDetails,
);

export default router;
