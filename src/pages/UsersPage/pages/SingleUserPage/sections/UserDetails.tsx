import { useNavigate, useParams } from "react-router-dom";
import Flex from "antd/es/flex";
import Button from "antd/es/button";
import Typography from "antd/es/typography";

import { useAppSelector } from "shared/store";
import { selectUserById } from "pages/UsersPage/usersSlice";
import UserInfo from "pages/UsersPage/shared/components/UserInfo/UserInfo";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  if (typeof user === "undefined") {
    return (
      <Flex vertical flex={1} justify="center" align="center">
        <Typography.Text>No user found with that id !</Typography.Text>
        <Button onClick={() => navigate("/")} type="primary">
          Go Home
        </Button>
      </Flex>
    );
  }

  return (
    <Flex vertical>
      <UserInfo user={user} />
    </Flex>
  );
};

export default UserDetails;
