import { Request, Response } from "express";
import Restaurant from "../models/restautant";
import mongoose from "mongoose";
import { uploadImage } from "../helpers/imageUpload";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.userId;

    const restaurant = await Restaurant.findOne({ user: id });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.userId;

    const existingRestaurant = await Restaurant.findOne({ user: id });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(id);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    return res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    const restaurant = await Restaurant.findOne({ user: id });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    return res.status(200).send(restaurant);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messgae: "Internal Server Error" });
  }
};

export {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  getRestaurantDetails,
};
