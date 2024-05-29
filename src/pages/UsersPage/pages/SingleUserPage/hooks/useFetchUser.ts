import { useCallback, useState } from "react";
import { axiosInstance } from "services";
import type { User } from "shared/types";


const useFetchUser = (userId: User["id"]) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data: user } = await axiosInstance.get(`/users/${userId}`)
      return user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);


  return [fetchUser, isLoading] as const;
};

export default useFetchUser;
