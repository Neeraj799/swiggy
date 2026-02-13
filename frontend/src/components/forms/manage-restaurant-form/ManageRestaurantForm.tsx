import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";

import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

import type { Restaurant } from "@/types/types";

const formSchema = z
  .object({
    restaurantName: z.string().min(1, "Restaurant name is required"),

    city: z.string().min(1, "City is required"),

    country: z.string().min(1, "Country is required"),

    deliveryPrice: z.coerce.number().min(1, "Delivery price is required"),

    estimatedDeliveryTime: z.coerce
      .number()
      .min(1, "Estimated delivery time is required"),

    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),

    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      }),
    ),

    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
};

const ManageRestaurantForm = ({ onSave, isPending, restaurant }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = restaurant.deliveryPrice;

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: item.price,
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: restaurantFormData) => {
    console.log("SUBMITTED", formDataJson);

    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());

    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString(),
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />

        <Separator />

        <CuisinesSection />

        <Separator />

        <MenuSection />

        <Separator />

        <ImageSection />

        {isPending ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
