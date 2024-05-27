import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "services";
import { User } from "types";

const useFetchUser = (userId: User["id"]) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return [user, isLoading] as const;
};

export default useFetchUser;
