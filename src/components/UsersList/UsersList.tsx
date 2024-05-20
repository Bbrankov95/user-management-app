import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Flex from "antd/es/flex";
import Empty from "antd/es/empty";
import Typography from "antd/es/typography";

import { UserCollapse } from "components";
import { usersAPI } from "services";
import { useAppSelector } from "store";
import { insertUsers, selectUsersAllIds } from "store/slices/usersSlice";

const UsersList = () => {
  const usersAllIds = useAppSelector(selectUsersAllIds);
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => {
    try {
      const data = (await usersAPI.getUsers()).data;
      dispatch(insertUsers(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Flex vertical align="center">
      <Typography.Title level={4}>Users</Typography.Title>
      {usersAllIds.length > 0 ? (
        usersAllIds.map((userId) => (
          <UserCollapse key={userId} userId={userId} />
        ))
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default UsersList;
