import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import Breadcrumb from "antd/es/breadcrumb";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import Spin from "antd/es/spin";

import {
  fetchUsersSuccess,
  selectUserById,
} from "pages/UsersPage/shared/slices/usersSlice";
import { useAppSelector } from "shared/store";
import { Posts } from "./components";
import { UserCollapse } from "pages/UsersPage/shared/components";

import useFetchUser from "./hooks/useFetchUser";

const SingleUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() ?? {};
  const [fetchUser, isLoading] = useFetchUser(Number(id));
  const user = useAppSelector((state) => selectUserById(state, Number(id)));
  const dispatch = useDispatch();

  useEffect(() => {
    const insertUser = async () => {
      const user = await fetchUser();
      if (user) {
        dispatch(fetchUsersSuccess([user]));
      }
    };
    insertUser();
  }, [user]);

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
        <UserCollapse user={user} defaultActiveKey={[id ?? "HOME"]} />
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
