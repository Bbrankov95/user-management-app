import Flex from "antd/es/flex";
import Empty from "antd/es/empty";
import Typography from "antd/es/typography";

import { useAppSelector } from "shared/store";
import { selectUsers } from "pages/UsersPage/usersSlice";
import { ExpandableUserInfo } from "pages/UsersPage/shared/components";
import { Spin } from "antd";

const UsersList = () => {
  const { data: users, loading, hasFetched } = useAppSelector(selectUsers);

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
        <ExpandableUserInfo key={user.id} user={user} />
      ))}
    </Flex>
  );
};

export default UsersList;
