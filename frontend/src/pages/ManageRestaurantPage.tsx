import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/components/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updatedRestaurant, isPending: isUpdateLoading } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updatedRestaurant : createRestaurant}
      isPending={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
