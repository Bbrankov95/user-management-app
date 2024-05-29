import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "services";
import type {Post} from '../../../../types'

const useFetchPosts = (userId: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/posts?userId=${userId}`);
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
