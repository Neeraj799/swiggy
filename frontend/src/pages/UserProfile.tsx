import { useGetUser, useUpdateUser } from "../api/UserApi";
import UserProfileForm from "../components/forms/user-profile-form/UserProfileForm";

const UserProfile = () => {
  const { currentUser, isPending: isGetLoading } = useGetUser();
  const { updateUser, isPending: isUpdateLoading } = useUpdateUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <div>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isPending={isUpdateLoading}
      />
    </div>
  );
};

export default UserProfile;
