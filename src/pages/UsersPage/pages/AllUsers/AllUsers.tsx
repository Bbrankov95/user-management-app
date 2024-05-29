import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUsersFailure,
  fetchUsersInit,
  fetchUsersSuccess,
  resetState,
} from "pages/UsersPage/shared/slices/usersSlice";
import { axiosInstance } from "services";
import { UsersList } from "./components";

const AllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersInit());
      try {
        const { data } = await axiosInstance.get("/users");
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure(error));
      }
    };
    fetchUsers();

    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return <UsersList />;
};

export default AllUsers;
