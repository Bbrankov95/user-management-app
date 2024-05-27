import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import Breadcrumb from "antd/es/breadcrumb";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import Spin from "antd/es/spin";

import { UserCollapse } from "modules/UsersModule/shared/components";
import useFetchUser from "./shared/hooks/useFetchUser";

import { Posts } from "./components";

const SingleUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() ?? {};
  const [user, isLoading] = useFetchUser(Number(id));

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (user) {
    return (
      <Flex vertical>
        <Breadcrumb
          style={{ padding: 10, fontWeight: "bold" }}
          items={[
            {
              title: (
                <NavLink to={"/"}>
                  <LeftOutlined /> User's List
                </NavLink>
              ),
            },
            {
              title: user.name,
            },
          ]}
        />
        <UserCollapse userId={Number(id)} defaultActiveKey={[id ?? 0]} />
        <Posts />
      </Flex>
    );
  }

  return (
    <Flex vertical flex={1} justify="center" align="center">
      <Typography.Text>No user found with that id !</Typography.Text>
      <Button onClick={() => navigate("/")} type="primary">
        Go Home
      </Button>
    </Flex>
  );
};

export default SingleUserPage;
