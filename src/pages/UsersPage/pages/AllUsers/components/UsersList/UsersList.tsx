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
} from "pages/UsersPage/shared/slices/usersSlice";
import { UserCollapse } from "pages/UsersPage/shared/components";
import { axiosInstance } from "services";
import { Spin } from "antd";

const UsersList = () => {
  const { data: users, loading, hasFetched } = useAppSelector(selectUsers);
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

  if (loading) {
    return <Spin size="large" />;
  }

  if (users.length === 0 && hasFetched) {
    return <Empty />;
  }

  return (
    <Flex vertical align="center">
      <Typography.Title level={4}>Users</Typography.Title>
      {users.map((user) => (
        <UserCollapse key={user.id} user={user} />
      ))}
    </Flex>
  );
};

export default UsersList;
