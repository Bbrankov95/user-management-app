import { Post } from "pages/SingleUserPage/components/Posts/types";
import { useState } from "react";

import { axiosInstance } from "services";

const useUpdatePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updatePost = async (postId: Post['id'], updatedPost: Post) => {
    setIsLoading(true)
    try {
      await axiosInstance.put(`/posts/${postId}`, updatedPost);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  return [updatePost, isLoading] as const;
};

export default useUpdatePost;
