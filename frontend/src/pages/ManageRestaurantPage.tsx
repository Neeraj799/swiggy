import { useCreateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/components/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateRestaurant();
  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isPending={isPending} />
    </div>
  );
};

export default ManageRestaurantPage;
