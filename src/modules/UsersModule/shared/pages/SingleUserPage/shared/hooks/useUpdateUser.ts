import { axiosInstance } from "services";
import { User } from "types";

const useUpdateUser = () => {
  const updateUser = async (userId: number, updatedUser: User) => {
    try {
      await axiosInstance.put(`/users/${userId}`, updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  return [updateUser] as const;
};

export default useUpdateUser;
