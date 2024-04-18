import { axiosInstance } from "services";
import { Post, User } from "types";

export const getUserPostsByUserId = (userId: User["id"]) =>
  axiosInstance.get<Post[]>(`/posts?userId=${userId}`);
export const deletePost = (postId: Post["id"]) =>
  axiosInstance.delete(`/posts/${postId}`);
export const updatePost = (postId: Post["id"], body: Post) =>
  axiosInstance.put(`/posts/${postId}`, body);
