import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "services";
import { User, Post as UserPost } from "types";

const useFetchPosts = (userId: User["id"]) => {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return [posts, isLoading] as const;
};

export default useFetchPosts;
