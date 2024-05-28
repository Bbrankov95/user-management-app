import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Flex from "antd/es/flex";
import Empty from "antd/es/empty";
import Typography from "antd/es/typography";

import { useAppSelector } from "shared/store";
import {
  selectUsers,
  fetchUsersFailure,
  fetchUsersInit,
  fetchUsersSuccess,
  resetState,
} from "../../../../slices/usersSlice";
import { UserCollapse } from "modules/UsersModule/shared/components";
import { axiosInstance } from "services";


const UsersList = () => {
  const { data: users } = useAppSelector(selectUsers);
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

  return (
    <Flex vertical align="center">
      <Typography.Title level={4}>Users</Typography.Title>
      {users.length > 0 ? (
        users.map((user) => <UserCollapse key={user.id} user={user} />)
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default UsersList;
