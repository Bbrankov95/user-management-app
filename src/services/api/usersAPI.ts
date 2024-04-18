import { axiosInstance } from "services";
import { User } from "types";

export const getUsers = () => axiosInstance.get<User[]>("/users");
export const getUserById = (userId: User["id"]) =>
  axiosInstance.get<User>(`/users/${userId}`);
export const updateUserById = (userId: User["id"], updatedUser: User) =>
  axiosInstance.put(`/users/${userId}`, updatedUser);
